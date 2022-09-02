import { UserModel } from 'models';
import * as ctmsService from 'services/ctms';
import { sendMessage, sendSubjectCtms } from 'services/facebook';

export const login = async (username: string, password: string, id: string) => {
  const result = await ctmsService.loginCtms(username, password);
  if (result.isSuccess) {
    const user = await UserModel.findOne({ username });
    if (!user) {
      const newUser = new UserModel({ username, password, id });
      await newUser.save();
    } else {
      await UserModel.updateOne({ username }, { password, id });
    }
    sendMessage(id, {
      text: `Xin chào ${username},\nBot đã lập lịch theo dõi tín chỉ cho bạn.`,
    });
    sendSubjectCtms(id, result.cookie);
  }
  return result;
};
