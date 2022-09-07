import logger from 'logger';
import { sendMessage } from 'services/facebook';

export const morningSchedule = async () => {
  logger.warn(`morningSchedule is running at ${new Date()}`);
  sendMessage('5611397915547076', {
    text: `morningSchedule is running at ${new Date()}`,
  });
};

export const noonSchedule = async () => {
  logger.warn(`noonSchedule is running at ${new Date()}`);
  sendMessage('5611397915547076', {
    text: `noonSchedule is running at ${new Date()}`,
  });
};

export const eveningSchedule = async () => {
  logger.warn(`eveningSchedule is running at ${new Date()}`);
  sendMessage('5611397915547076', {
    text: `eveningSchedule is running at ${new Date()}`,
  });
};
