/* eslint-disable max-len */
import logger from 'logger';
import { ArticlesModel, UserModel } from 'models';
import {
  convertHtmlToImage,
  deleteImage,
  getSubjects,
  getSubjectsInHTML,
  getUserID,
  loginCtms,
  logoutCtms,
} from 'services/ctms';
import config from '../../config';
import { QUICK_REPLIES_TYPE } from './type';
const { default: axios } = require('axios');

const sendMessage = async (id: string, message: any) => {
  try {
    await axios.post(`https://graph.facebook.com/v14.0/me/messages?access_token=${config.accessToken}`, {
      recipient: {
        id: id,
      },
      message,
      messaging_type: 'MESSAGE_TAG',
      tag: 'ACCOUNT_UPDATE',
    });
  } catch {
    logger.error(`Error when sending button id: ${id}`);
  }
};

const sendLoginCtmsButton = async (id: string) => {
  const user = await UserModel.findOne({ subscribedID: id });

  logger.warn(user);
  if (user) {
    sendMessage(id, {
      text: `CTMS BOT: Bạn đã đăng nhập CTMS. Vui lòng xóa tài khoản CTMS khỏi hệ thống trước khi đăng nhập lại.`,
    });
    return;
  }

  sendMessage(id, {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: 'CTMS Tool!',
            image_url: 'https://image.lag.vn/upload/news/22/07/04/chac-la-khong-gion-dau-la-gi_YLUE.jpg',
            subtitle: 'Đăng nhập để sử dụng bot.',
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

const removeCtmsAccount = async (id: string) => {
  const user = await UserModel.findOne({ subscribedID: id });
  if (user) {
    await UserModel.deleteOne({ subscribedID: id });
    sendMessage(id, {
      text: `CTMS BOT: Xóa tài khoản CTMS khỏi hệ thống thành công.`,
    });
  } else {
    sendMessage(id, {
      text: `CTMS BOT: Bạn chưa thêm tài khoản CTMS vào hệ thống.`,
    });
  }
};

const sendSubjectCtms = async (receiver: string | string[], cookie: Array<string>, username: string) => {
  try {
    const user = await UserModel.findOne({ username });
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
      logoutCtms(cookie);
      return;
    }

    const data = await convertHtmlToImage(subjects);

    await UserModel.updateOne({ username }, { subjectHTML: subjects });

    if (typeof receiver === 'string') {
      receiver = [receiver];
    } else {
      receiver.forEach(async (receiver_id) => {
        await sendMessage(receiver_id, {
          text: `Hú hú ${username} phát hiện có thay đổi trong đăng ký tín chỉ của bạn (dựa theo môn học, thời gian, giảng viên, mã lớp).
Bạn nên tắt tính năng này khi không cần dùng đến :D`,
        });
      });
    }

    receiver.forEach(async (receiver_id: string) => {
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

const subCtmsSubject = async (id: string) => {
  const user = await UserModel.findOne({ subscribedID: id });
  if (!user) {
    sendMessage(id, {
      text: `CTMS BOT: Bạn chưa thêm tài khoản CTMS vào hệ thống.`,
    });
    return;
  }

  if (user.isSubscribedSubject) {
    sendMessage(id, {
      text: `CTMS BOT: Bạn đã đăng theo dõi tín rồi nha.`,
    });
    return;
  }

  await UserModel.updateOne({ subscribedID: id }, { isSubscribedSubject: true });

  await sendMessage(id, {
    text: `Bot đã lập lịch theo dõi tín chỉ cho bạn. Lưu ý, bạn nên tắt tính năng này khi k cần dùng đến nha :D`,
  });
  const data = await loginCtms(user.username, user.password);
  if (data.isSuccess) {
    await sendMessage(id, {
      text: `Dưới đây là các môn bạn hiện tại bạn có thể đăng ký. \nBot sẽ gửi thông báo cho bạn khi có thay đổi.`,
    });
    await sendSubjectCtms(id, data.cookie, user.username);
  }
};

const unsubCtmsSubject = async (id: string) => {
  const user = await UserModel.findOne({ subscribedID: id });
  if (!user) {
    sendMessage(id, {
      text: `CTMS BOT: Bạn chưa thêm tài khoản CTMS vào hệ thống.`,
    });
    return;
  }
  if (user.isSubscribedSubject) {
    user.isSubscribedSubject = false;
    await user.save();
    await sendMessage(id, {
      text: `CTMS BOT: Đã hủy theo dõi tín chỉ.`,
    });
  } else {
    await sendMessage(id, {
      text: `CTMS BOT: Bạn chưa đăng ký theo dõi tín chỉ.`,
    });
  }
};

const trackTimetable = async (receiver: string) => {
  try {
    const updateDoc = {
      $set: {
        isTrackTimetable: true,
      },
    };
    const user = await UserModel.findOneAndUpdate({ subscribedID: receiver }, updateDoc);
    if (user?.isTrackTimetable) {
      await sendMessage(receiver, {
        text: `Bạn đã bật chức năng thông báo lịch học hàng ngày rồi nha.`,
      });
      return;
    }

    if (user) {
      sendMessage(receiver, {
        text: `🔔 Bật chức năng thông báo lịch học hàng ngày thành công!`,
      });
    } else {
      sendMessage(receiver, {
        text: `❗️ Bạn chưa thêm tài khoản CTMS vào hệ thống.`,
      });
    }
  } catch (error) {
    logger.error(error);
  }
};

const unTrackTimetable = async (receiver: string) => {
  try {
    const updateDoc = {
      $set: {
        isTrackTimetable: false,
      },
    };
    const user = await UserModel.findOneAndUpdate({ subscribedID: receiver }, updateDoc);

    if (!user?.isTrackTimetable) {
      await sendMessage(receiver, {
        text: `Bạn chưa bật chức năng thông báo lịch học hàng ngày.`,
      });
      return;
    }

    if (user) {
      sendMessage(receiver, {
        text: `🔕 Đã tắt chức năng thông báo lịch học hàng ngày!`,
      });
    } else {
      sendMessage(receiver, {
        text: `❗️ Bạn chưa thêm tài khoản CTMS vào hệ thống.`,
      });
    }
  } catch (error) {
    logger.error(error);
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

const sendQuickReplies = async (id: string, text: string, quick_replies: QUICK_REPLIES_TYPE[]) => {
  try {
    await axios.post(`https://graph.facebook.com/v14.0/me/messages?access_token=${config.accessToken}`, {
      recipient: {
        id,
      },
      messaging_type: 'RESPONSE',
      message: {
        text,
        quick_replies,
      },
    });
  } catch (error) {
    logger.error(`Error ${error}`);
  }
};

export {
  sendMessage,
  sendLoginCtmsButton,
  sendSubjectCtms,
  subscribedFithouNotification,
  unsubCtmsSubject,
  unsubFithouNotification,
  unTrackTimetable,
  trackTimetable,
  subCtmsSubject,
  removeCtmsAccount,
  sendQuickReplies,
};
