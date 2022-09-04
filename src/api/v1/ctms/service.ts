/* eslint-disable max-len */
import { UserModel } from 'models';
import * as ctmsService from 'services/ctms';
import { sendMessage, sendSubjectCtms } from 'services/facebook';

export const login = async (username: string, password: string, id: string) => {
  const result = await ctmsService.loginCtms(username, password);
  if (result.isSuccess) {
    const user = await UserModel.findOne({ username });
    if (!user) {
      const newUser = new UserModel({ username, password, subscribedIDs: [id] });
      await newUser.save();
    } else {
      if (user.subscribedIDs.indexOf(id) === -1) user.subscribedIDs.push(id);
      await UserModel.updateOne({ username }, { password, subscribedIDs: user.subscribedIDs });
    }
    await sendMessage(id, {
      text: `Xin chào ${username},\nBot đã lập lịch theo dõi tín chỉ cho bạn. Lưu ý, bạn nên tắt tính năng này khi k cần dùng đến nha :D`,
    });
    sendMessage(id, {
      text: `Dưới đây là các môn bạn hiện tại bạn có thể đăng ký. \nBot sẽ gửi thông báo cho bạn khi có thay đổi.`,
    });
    sendSubjectCtms(id, result.cookie, username);
  }
  return result;
};
