import logger from 'logger';
import { crawlFithouService } from 'services/fithou';

export const crawlFithouJob = async () => {
  await crawlFithouService();
  logger.info(`crawlFithouJob is running at ${new Date()}`);
};
