/* eslint-disable max-len */
import {
  sendLoginCtmsButton,
  sendMessage,
  subCtmsSubject,
  subscribedFithouNotification,
  unsubCtmsSubject,
  unsubFithouNotification,
  unTrackTimetable,
  removeCtmsAccount,
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
        case 'ADD_CTMS_ACCOUNT':
          sendLoginCtmsButton(id);
          return;
        case 'REMOVE_CTMS_ACCOUNT':
          removeCtmsAccount(id);
          return;
        case 'CTMS_SUBJECTS':
          subCtmsSubject(id);
          return;
        case 'FITHOU_NOTIFICATION':
          subscribedFithouNotification(id);
          return;
        case 'UNSUB_CTMS_SUBJECTS':
          unsubCtmsSubject(id);
          return;
        case 'UNNOTIFY_TIMETABLE':
          unTrackTimetable(id);
          return;
        case 'UNSUB_FITHOU_NOTIFICATION':
          unsubFithouNotification(id);
          return;
        default:
          return;
      }
    } else if (message) {
      sendMessage(id, {
        text: `Bot ngu ngok quá, không hiểu gì hết :(`,
      });
    }
  }
};

export { handleWebhook };
