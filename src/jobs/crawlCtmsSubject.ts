import { UserModel } from 'models';
import { loginCtms, logoutCtms } from 'services/ctms';
import { sendMessage, sendSubjectCtms, unsubCtmsNotification } from 'services/facebook';
import { SimpleIntervalJob, Task } from 'toad-scheduler';

const task = new Task('simple task', async () => {
  UserModel.find({}).then(async (users) => {
    users.forEach(async (user) => {
      const { isSuccess, errorMsg, cookie } = await loginCtms(user.username, user.password);
      if (isSuccess) {
        sendSubjectCtms(user.subscribedIDs, cookie, user.username);
      } else {
        if (errorMsg.trim() === 'Sai Tên đăng nhập hoặc Mật khẩu') {
          user.subscribedIDs.forEach(async (id) => {
            await sendMessage(id, {
              text: `CTMS BOT: ${user.username} - ${errorMsg}`,
            });
            await unsubCtmsNotification(id);
          });
        }
      }
      //logoutCtms(cookie);
    });
  });
});

const job = new SimpleIntervalJob({ seconds: 60 * 2, runImmediately: true }, task, 'id_1');

export default job;
