/* eslint-disable max-len */
import {
  sendLoginCtmsButton,
  sendMessage,
  subCtmsSubject,
  subscribedFithouNotification,
  unsubCtmsSubject,
  unsubFithouNotification,
  unTrackTimetable,
  trackTimetable,
  removeCtmsAccount,
  sendQuickReplies,
} from 'services/facebook';

const handleWebhook = async (data: any) => {
  const messaging = data.entry[0].messaging;
  for (let i = 0; i < messaging.length; i++) {
    const { sender, postback, message } = messaging[i];

    const { id } = sender;
    if (postback) {
      const { payload } = postback;
      switch (payload) {
        case 'GET_STARTED':
          await sendMessage(id, {
            text: `Chào mừng bạn đến với Fithou BOT. Chúc bạn có một trải nghiệm zui zẻ :D`,
          });
          return;
        case 'CTMS_SERVICE':
          sendQuickReplies(id, 'Chọn một câu trả lời:', [
            {
              content_type: 'text',
              title: 'Thêm CTMS',
              payload: 'ADD_CTMS_ACCOUNT',
              image_url:
                'https://res.cloudinary.com/domvksfsk/image/upload/v1662532148/images/4bd6f5ad30f28e2e68226c44d2b139.png',
            },
            {
              content_type: 'text',
              title: 'Xóa CTMS',
              payload: 'REMOVE_CTMS_ACCOUNT',
              image_url:
                'https://res.cloudinary.com/domvksfsk/image/upload/v1662532170/images/33c92f929c613a191e3cec3e08132f.png',
            },
          ]);
          return;
        case 'FITHOU_CRAWL_SERVICE':
          sendQuickReplies(id, 'Chọn một câu trả lời:', [
            {
              content_type: 'text',
              title: 'Bật thông báo',
              payload: 'ADD_FITHOU_CRAWL_SERVICE',
              image_url:
                'https://res.cloudinary.com/domvksfsk/image/upload/v1662533474/images/446924bc9ec95ec6abdb8e9ff5b62c.png',
            },
            {
              content_type: 'text',
              title: 'Tắt thông báo',
              payload: 'REMOVE_FITHOU_CRAWL_SERVICE',
              image_url:
                'https://res.cloudinary.com/domvksfsk/image/upload/v1662533503/images/087e19b08d558d0c8371bb4a80ec1a.png',
            },
          ]);
          return;
        case 'CTMS_CREDITS_SERVICE':
          sendQuickReplies(id, 'Chọn một câu trả lời:', [
            {
              content_type: 'text',
              title: 'Bật theo dõi',
              payload: 'ADD_CTMS_CREDITS_SERVICE',
              image_url:
                'https://res.cloudinary.com/domvksfsk/image/upload/v1662533474/images/446924bc9ec95ec6abdb8e9ff5b62c.png',
            },
            {
              content_type: 'text',
              title: 'Tắt theo dõi',
              payload: 'REMOVE_CTMS_CREDITS_SERVICE',
              image_url:
                'https://res.cloudinary.com/domvksfsk/image/upload/v1662533503/images/087e19b08d558d0c8371bb4a80ec1a.png',
            },
          ]);
          return;
        case 'CTMS_TIMETABLE_SERVICE':
          sendQuickReplies(id, 'Chọn một câu trả lời:', [
            {
              content_type: 'text',
              title: 'Bật thông báo',
              payload: 'ADD_CTMS_TIMETABLE_SERVICE',
              image_url:
                'https://res.cloudinary.com/domvksfsk/image/upload/v1662533474/images/446924bc9ec95ec6abdb8e9ff5b62c.png',
            },
            {
              content_type: 'text',
              title: 'Tắt thông báo',
              payload: 'REMOVE_CTMS_TIMETABLE_SERVICE',
              image_url:
                'https://res.cloudinary.com/domvksfsk/image/upload/v1662533503/images/087e19b08d558d0c8371bb4a80ec1a.png',
            },
          ]);
          return;
        default:
          return;
      }
    } else if (message) {
      const { quick_reply } = message;

      if (quick_reply) {
        switch (quick_reply?.payload) {
          case 'ADD_CTMS_ACCOUNT':
            sendLoginCtmsButton(id);
            return;
          case 'REMOVE_CTMS_ACCOUNT':
            removeCtmsAccount(id);
            return;
          case 'ADD_FITHOU_CRAWL_SERVICE':
            subscribedFithouNotification(id);
            return;
          case 'REMOVE_FITHOU_CRAWL_SERVICE':
            unsubFithouNotification(id);
            return;
          case 'ADD_CTMS_CREDITS_SERVICE':
            subCtmsSubject(id);
            return;
          case 'REMOVE_CTMS_CREDITS_SERVICE':
            unsubCtmsSubject(id);
            return;
          case 'ADD_CTMS_TIMETABLE_SERVICE':
            trackTimetable(id);
            return;
          case 'REMOVE_CTMS_TIMETABLE_SERVICE':
            unTrackTimetable(id);
            return;
          default:
            break;
        }
      } else {
        sendMessage(id, {
          text: `Bot ngu ngok quá, không hiểu gì hết :(`,
        });
      }
    }
  }
};

export { handleWebhook };
