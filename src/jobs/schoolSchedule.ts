/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import logger from 'logger';
import { sendMessage } from 'services/facebook';
import { UserModel } from 'models';
import { schoolScheduleService } from 'services/ctms/schoolSchedule';

export const morningSchedule = async () => {
  try {
    const users: any[] = await UserModel.find({ isTrackTimetable: true });
    for (const user of users) {
      const timeTable: any = await schoolScheduleService(user.username, user.password);

      const sessionOne = timeTable?.sessionOne;
    
      if (sessionOne?.length > 0 && sessionOne[sessionOne?.length - 1] === 'Học') {
        const message = `📝 Bạn có môn học vào buổi sáng nha:\n-----------------\nGiờ: ${sessionOne[1]}\nPhòng: ${sessionOne[2]}\nMôn học: ${sessionOne[3]}\nGiảng viên: ${sessionOne[4]}\nLớp: ${sessionOne[5]}`

        await sendMessage(user.subscribedID, {
          text: message,
        });
      }

      if (sessionOne?.length > 0 && sessionOne[sessionOne?.length - 1] === 'Học trực tuyến') {
        const message = `📝 Bạn có môn học trực tuyến vào buổi sáng nha:\n-----------------\nGiờ: ${sessionOne[1]}\nPhòng: ${sessionOne[2]}\nMôn học: ${sessionOne[3]}\nGiảng viên: ${sessionOne[4]}\nLớp: ${sessionOne[5]}`

        await sendMessage(user.subscribedID, {
          text: message,
        });
      }

      if (sessionOne?.length > 0 && sessionOne[sessionOne?.length - 1] !== 'Học') {
        const message = `🆘🆘🆘 Môn học sáng nay của bạn đã bị hủy (hoặc nghỉ học):\n-----------------\nGiờ: ${sessionOne[1]}\nPhòng: ${sessionOne[2]}\nMôn học: ${sessionOne[3]}\nGiảng viên: ${sessionOne[4]}\nLớp: ${sessionOne[5]}`
      
        await sendMessage(user.subscribedID, {
          text: message,
        });
      }
    }
  } catch (error) {
    logger.error(error);
  }
};

export const noonSchedule = async () => {
  try {
    const users: any[] = await UserModel.find({ isTrackTimetable: true });
    for (const user of users) {
      const timeTable: any = await schoolScheduleService(user.username, user.password);

      const sessionTwo = timeTable?.sessionTwo;

      if (sessionTwo?.length > 0 && sessionTwo[sessionTwo?.length - 1] === 'Học') {
        const message = `Bạn có môn học vào buổi chiều nha:\n-----------------\nGiờ: ${sessionTwo[1]}\nPhòng: ${sessionTwo[2]}\nMôn học: ${sessionTwo[3]}\nGiảng viên: ${sessionTwo[4]}\nLớp: ${sessionTwo[5]}`
        
        await sendMessage(user.subscribedID, {
          text: message,
        });
      }
      
      if (sessionTwo?.length > 0 && sessionTwo[sessionTwo?.length - 1] === 'Học trực tuyến') {
        const message = `Bạn có môn học trực tuyến vào buổi chiều nha:\n-----------------\nGiờ: ${sessionTwo[1]}\nPhòng: ${sessionTwo[2]}\nMôn học: ${sessionTwo[3]}\nGiảng viên: ${sessionTwo[4]}\nLớp: ${sessionTwo[5]}`
        
        await sendMessage(user.subscribedID, {
          text: message,
        });
      }

      if (sessionTwo?.length > 0 && sessionTwo[sessionTwo?.length - 1] !== 'Học') {
        const message = `🆘🆘🆘 Môn học chiều nay của bạn đã bị hủy (hoặc nghỉ học):\n-----------------\nGiờ: ${sessionTwo[1]}\nPhòng: ${sessionTwo[2]}\nMôn học: ${sessionTwo[3]}\nGiảng viên: ${sessionTwo[4]}\nLớp: ${sessionTwo[5]}`
        
        await sendMessage(user.subscribedID, {
          text: message,
        });
      }
    }
  } catch (error) {
    logger.error(error);
  }
};

export const eveningSchedule = async () => {
  try {
    const users: any[] = await UserModel.find({ isTrackTimetable: true });
    for (const user of users) {
      const timeTable: any = await schoolScheduleService(user.username, user.password);

      const sessionThree = timeTable?.sessionThree;

      if (sessionThree?.length > 0 && sessionThree[sessionThree?.length - 1] === 'Học') {
        const message = `Bạn có môn học vào buổi tối nha:\n-----------------\nGiờ: ${sessionThree[1]}\nPhòng: ${sessionThree[2]}\nMôn học: ${sessionThree[3]}\nGiảng viên: ${sessionThree[4]}\nLớp: ${sessionThree[5]}`
        
        await sendMessage(user.subscribedID, {
          text: message,
        });
      }

      if (sessionThree?.length > 0 && sessionThree[sessionThree?.length - 1] === 'Học trực tuyến') {
        const message = `Bạn có môn học trực tuyến vào buổi tối nha:\n-----------------\nGiờ: ${sessionThree[1]}\nPhòng: ${sessionThree[2]}\nMôn học: ${sessionThree[3]}\nGiảng viên: ${sessionThree[4]}\nLớp: ${sessionThree[5]}`
        
        await sendMessage(user.subscribedID, {
          text: message,
        });
      }

      if (sessionThree?.length > 0 && sessionThree[sessionThree?.length - 1] !== 'Học') {
        const message = `🆘🆘🆘 Môn học tối nay của bạn đã bị hủy (hoặc nghỉ học):\n-----------------\nGiờ: ${sessionThree[1]}\nPhòng: ${sessionThree[2]}\nMôn học: ${sessionThree[3]}\nGiảng viên: ${sessionThree[4]}\nLớp: ${sessionThree[5]}`

        await sendMessage(user.subscribedID, {
          text: message,
        });
      }
    }
  } catch (error) {
    logger.error(error);
  }
};
