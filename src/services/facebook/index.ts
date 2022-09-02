import logger from 'logger';
import { ArticlesModel } from 'models';
import { convertHtmlToImage, deleteImage, getSubjects, getUserID, logoutCtms } from 'services/ctms';
import config from '../../config';
const { default: axios } = require('axios');

const sendMessage = async (id: string, message: any) => {
  console.log(message);
  try {
    await axios.post(`https://graph.facebook.com/v14.0/me/messages?access_token=${config.accessToken}`, {
      recipient: {
        id: id,
      },
      message,
    });
    console.log('Send message success');
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

const sendSubjectCtms = async (receiver: string, cookie: Array<string>) => {
  const id = await getUserID(cookie);
  const subjects = await getSubjects(cookie, id);
  const data = await convertHtmlToImage(subjects);
  setTimeout(() => {
    deleteImage(data.image);
  }, 1000 * 60 * 2);
  sendMessage(receiver, {
    text: `Dưới đây là các môn bạn hiện tại bạn có thể đăng ký. \nBot sẽ gửi thông báo cho bạn khi có thay đổi.`,
  });
  sendMessage(receiver, {
    attachment: {
      type: 'image',
      payload: {
        url: config.host + '/' + data.image,
      },
    },
  });
  logoutCtms(cookie);
};

const subscribedFithouNotification = async (receiver: string) => {
  sendMessage(receiver, {
    text: `Đăng ký nhận bài viết mới từ Fithou thành công.`,
  });
  const article = await ArticlesModel.findOne({});
  if (article.subscribedIDs.indexOf(receiver) === -1) {
    article.subscribedIDs.push(receiver);
    await article.save();
  }
  sendMessage(receiver, {
    text: `Gửi bạn bài viết mới nhất hiện tại. Bot sẽ câp nhật thông báo khi có bài viết mới.\n${article.link}`,
  });
};

export { sendMessage, sendLoginCtmsButton, sendSubjectCtms, subscribedFithouNotification };
