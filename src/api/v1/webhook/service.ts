import { sendLoginCtmsButton, sendMessage } from 'services/facebook';

const handleWebhook = async (data: any) => {
  const messaging = data.entry[0].messaging;
  for (let i = 0; i < messaging.length; i++) {
    const { sender, postback, message } = messaging[i];
    const { id } = sender;
    if (postback) {
      const { payload } = postback;
      switch (payload) {
        case 'CTMS_SUBJECTS':
          sendLoginCtmsButton(id);
          break;
        default:
          break;
      }
      return;
    } else if (message) {
      sendMessage(id, {
        text: `Bot ngu ngok quá, không hiểu gì hết :(`,
      });
    }
  }
};

export { handleWebhook };
