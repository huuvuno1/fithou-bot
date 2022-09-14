/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import logger from 'logger';
import { sendMessage } from 'services/facebook';
import { UserModel } from 'models';
import { schoolScheduleService } from 'services/ctms/schoolSchedule';

const message = (text: string, session: any[]) => {
  return `${text} nha:\n-----------------\nGiờ: ${session[1]}\nPhòng: ${session[2]}\nMôn học: ${session[3]}\nGiảng viên: ${session[4]}\nLớp: ${session[5]}`
}

export const morningSchedule = async () => {
  try {
    const users: any[] = await UserModel.find({ isTrackTimetable: true });
    for (const user of users) {
      const timeTable: any = await schoolScheduleService(user.username, user.password);

      if (timeTable.isExpired) { 
        
        await sendMessage(user.subscribedID, {
          text:'Tài khoản CTMS của bạn đã hết hạn, vui lòng gửi mail theo hướng dẫn để dùng tiếp dịch vụ nha!🥲',
        });

        continue;
      }
      

      const sessionOne = timeTable?.sessionOne;
    
      if (sessionOne?.length > 0 && sessionOne[sessionOne?.length - 1] === 'Học') {
        await sendMessage(user.subscribedID, {
          text: message(`📝 Bạn có môn học vào buổi sáng`, sessionOne),
        });
      }

      if (sessionOne?.length > 0 && sessionOne[sessionOne?.length - 1] === 'Học trực tuyến') {
        await sendMessage(user.subscribedID, {
          text: message(`📝 Bạn có môn học trực tuyến vào buổi sáng`, sessionOne),
        });
      }

      if (sessionOne?.length > 0 && sessionOne[sessionOne?.length - 1] !== 'Học') {      
        await sendMessage(user.subscribedID, {
          text: message(`🆘🆘🆘 Môn học sáng nay của bạn đã bị hủy (hoặc nghỉ học)`, sessionOne),
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

      if (timeTable.isExpired) { 
        
        await sendMessage(user.subscribedID, {
          text:'Tài khoản CTMS của bạn đã hết hạn, vui lòng gửi mail theo hướng dẫn để dùng tiếp dịch vụ nha!🥲',
        });

        continue;
      }

      const sessionTwo = timeTable?.sessionTwo;

      if (sessionTwo?.length > 0 && sessionTwo[sessionTwo?.length - 1] === 'Học') {        
        await sendMessage(user.subscribedID, {
          text: message(`📝 Bạn có môn học vào buổi chiều`, sessionTwo),
        });
      }
      
      if (sessionTwo?.length > 0 && sessionTwo[sessionTwo?.length - 1] === 'Học trực tuyến') {        
        await sendMessage(user.subscribedID, {
          text: message(`📝 Bạn có môn học trực tuyến vào buổi chiều`, sessionTwo),
        });
      }

      if (sessionTwo?.length > 0 && sessionTwo[sessionTwo?.length - 1] !== 'Học') {        
        await sendMessage(user.subscribedID, {
          text: message(`🆘🆘🆘 Môn học chiều nay của bạn đã bị hủy (hoặc nghỉ học)`, sessionTwo),
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

      if (timeTable.isExpired) { 
        
        await sendMessage(user.subscribedID, {
          text:'Tài khoản CTMS của bạn đã hết hạn, vui lòng gửi mail theo hướng dẫn để dùng tiếp dịch vụ nha!🥲',
        });

        continue;
      }

      const sessionThree = timeTable?.sessionThree;

      if (sessionThree?.length > 0 && sessionThree[sessionThree?.length - 1] === 'Học') {        
        await sendMessage(user.subscribedID, {
          text: message(`📝 Bạn có môn học vào buổi tối`, sessionThree),
        });
      }

      if (sessionThree?.length > 0 && sessionThree[sessionThree?.length - 1] === 'Học trực tuyến') {        
        await sendMessage(user.subscribedID, {
          text: message(`📝 Bạn có môn học trực tuyến vào buổi tối`, sessionThree),
        });
      }

      if (sessionThree?.length > 0 && sessionThree[sessionThree?.length - 1] !== 'Học') {
        await sendMessage(user.subscribedID, {
          text: message(`🆘🆘🆘 Môn học tối nay của bạn đã bị hủy (hoặc nghỉ học)`, sessionThree),
        });
      }
    }
  } catch (error) {
    logger.error(error);
  }
};
