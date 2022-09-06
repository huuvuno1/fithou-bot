/* eslint-disable max-len */
import logger from 'logger';
import { ArticlesModel, UserModel } from 'models';
import { convertHtmlToImage, deleteImage, getSubjects, getSubjectsInHTML, getUserID, logoutCtms } from 'services/ctms';
import config from '../../config';
const { default: axios } = require('axios');

const sendMessage = async (id: string, message: any) => {
  try {
    await axios.post(`https://graph.facebook.com/v14.0/me/messages?access_token=${config.accessToken}`, {
      recipient: {
        id: id,
      },
      message,
    });
  } catch {
    logger.error(`Error when sending button id: ${id}`);
  }
};

const sendLoginCtmsButton = (id: string) => {
  sendMessage(id, {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: 'CTMS Tool!',
            image_url: 'https://image.lag.vn/upload/news/22/07/04/chac-la-khong-gion-dau-la-gi_YLUE.jpg',
            subtitle: 'Đăng nhập để sử dụng tool.',
            buttons: [
              {
                type: 'web_url',
                url: `${config.host}?id=${id}`,
                title: 'Login',
                messenger_extensions: true,
                webview_height_ratio: 'compact',
              },
            ],
          },
        ],
      },
    },
  });
};

const sendSubjectCtms = async (receiver: string | string[], cookie: Array<string>, username: string) => {
  try {
    const user = await UserModel.findOne({ username });
    console.log(user.username, user.subscribedIDs, typeof receiver);
    if (typeof receiver === 'string' && user.subjectHTML !== '') {
      const data = await convertHtmlToImage(user.subjectHTML);
      if (data.status) {
        await sendMessage(receiver, {
          attachment: {
            type: 'image',
            payload: {
              url: config.host + '/' + data.image,
            },
          },
        });
        setTimeout(() => {
          deleteImage(data.image);
        }, 1000 * 60 * 2);
      } else {
        await sendMessage(receiver, {
          text: `Đang có lỗi khi chuyển đổi ảnh(team sẽ sớm khắc phục). Bạn xem tạm text nha :D \n ${getSubjectsInHTML(
            user.subjectHTML
          )}`,
        });
      }
      return;
    }

    const id = await getUserID(cookie);
    const subjects = await getSubjects(cookie, id);
    if (subjects === null || user.subjectHTML === subjects) {
      if (subjects === null) console.log('get subject fail ', id);
      logoutCtms(cookie);
      return;
    }
    const data = await convertHtmlToImage(subjects);

    UserModel.updateOne({ username }, { subjectHTML: subjects }).then();

    if (typeof receiver === 'string') {
      receiver = [receiver];
    }
    console.log('convert image result: ', data);

    receiver.forEach(async (receiver_id: string) => {
      await sendMessage(receiver_id, {
        text: `Hú hú ${username} phát hiện có thay đổi trong đăng ký tín chỉ của bạn (dựa theo môn học, thời gian, giảng viên, mã lớp).`,
      });
      if (data.status) {
        await sendMessage(receiver_id, {
          attachment: {
            type: 'image',
            payload: {
              url: config.host + '/' + data.image,
            },
          },
        });
        setTimeout(() => {
          deleteImage(data.image);
        }, 1000 * 60 * 2);
      } else {
        await sendMessage(receiver_id, {
          text: `Đang có lỗi khi chuyển đổi ảnh(team sẽ sớm khắc phục). Bạn xem tạm text nha :D \n ${getSubjectsInHTML(
            user.subjectHTML
          )}`,
        });
      }
    });
  } catch (e) {
    console.log(e);
  } finally {
    await logoutCtms(cookie);
  }
};

const subscribedFithouNotification = async (receiver: string) => {
  const article = await ArticlesModel.findOne({});
  if (article.subscribedIDs.indexOf(receiver) !== -1) {
    await sendMessage(receiver, {
      text: `Bạn đã đăng ký nhận thông báo từ Fithou rồi.`,
    });
    return;
  }
  article.subscribedIDs.push(receiver);
  await article.save();
  await sendMessage(receiver, {
    text: `Đăng ký nhận bài viết mới từ Fithou thành công.`,
  });
  await sendMessage(receiver, {
    text: `Gửi bạn bài viết mới nhất hiện tại. Bot sẽ câp nhật thông báo khi có bài viết mới.\n${article.link}`,
  });
};

const unsubCtmsNotification = async (receiver: string) => {
  sendMessage(receiver, {
    text: `Đã hủy nhận thông báo từ CTMS.`,
  });
  const user = await UserModel.findOne({ subscribedIDs: receiver });
  if (user) {
    user.subscribedIDs = user.subscribedIDs.filter((id) => id !== receiver);
    await user.save();
  }
};

const unsubFithouNotification = async (receiver: string) => {
  sendMessage(receiver, {
    text: `Đã hủy nhận thông báo từ Fithou.`,
  });
  const article = await ArticlesModel.findOne({});
  article.subscribedIDs = article.subscribedIDs.filter((id) => id !== receiver);
  await article.save();
};

export {
  sendMessage,
  sendLoginCtmsButton,
  sendSubjectCtms,
  subscribedFithouNotification,
  unsubCtmsNotification,
  unsubFithouNotification,
};
