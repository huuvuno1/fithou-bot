import { NextFunction, Request } from 'express';
/* eslint-disable max-len */
import { UserModel } from 'models';
import * as ctmsService from 'services/ctms';
import { sendMessage } from 'services/facebook';

export const login = async (username: string, password: string, id: string) => {
  const result = await ctmsService.loginCtms(username, password);
  if (result.isSuccess) {
    const oldUser = await UserModel.findOne({ username });
    if (!oldUser) {
      const newUser = new UserModel({ username, password, subscribedID: id });
      await newUser.save();
    } else {
      if (oldUser && oldUser.subscribedID !== id) {
        await sendMessage(oldUser.subscribedID, {
          text: `CTMS BOT: Tài khoản này đã được đăng ký với người dùng khác. Bot sẽ hủy đăng ký tài khoản này.`,
        });
        await UserModel.deleteOne({ username });
      }
      await UserModel.updateOne(
        { subscribedID: id },
        { username, password, isSubscribedSubject: false, isTrackTimetable: false }
      );
    }

    sendMessage(id, {
      text: `CTMS BOT: Đăng nhập thành công! Bạn đã có thể  sử dụng các dịch vụ ctms bot cung cấp.`,
    });
  }
  return result;
};

export const sendNotiForUserOfCTMS = async (req: Request, next: NextFunction) => {
  const { message } = req.body;
  const users: any[] = await UserModel.find();
  for (let i = 0; i < users.length; i++) {
    await sendMessage(users[i].subscribedID, {
      text: `${message}`,
    });
  }
  return message;
};
