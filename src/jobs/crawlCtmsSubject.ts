import { UserModel } from 'models';
import { loginCtms, logoutCtms } from 'services/ctms';
import { sendMessage, sendSubjectCtms, unsubCtmsSubject, unTrackTimetable } from 'services/facebook';
import { SimpleIntervalJob, Task } from 'toad-scheduler';

const task = new Task('simple task', async () => {
  UserModel.find({}).then(async (users) => {
    users.forEach(async (user) => {
      if (!user.isSubscribedSubject) {
        return;
      }
      const { isSuccess, errorMsg, cookie } = await loginCtms(user.username, user.password);
      if (isSuccess) {
        await sendSubjectCtms([user.subscribedID], cookie, user.username);
      } else {
        if (errorMsg.trim() === 'Sai Tên đăng nhập hoặc Mật khẩu') {
          await sendMessage(user.subscribedID, {
            text: `CTMS BOT: ${user.username} - ${errorMsg}`,
          });
          await unsubCtmsSubject(user.subscribedID);
          await unTrackTimetable(user.subscribedID);
        }
      }
      //logoutCtms(cookie);
    });
  });
});

const job = new SimpleIntervalJob({ seconds: 60 * 5, runImmediately: true }, task, 'id_1');

export default job;
