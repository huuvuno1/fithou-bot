import config from 'config';
import logger from 'logger';
import schedule from 'node-schedule';
import { ToadScheduler } from 'toad-scheduler';
import job from './crawlCtmsSubject';
import crawlCtmsJob from './crawlCtmsSubject';

const scheduler = new ToadScheduler();

const rule = new schedule.RecurrenceRule();
// your timezone
rule.tz = 'Asia/Ho_Chi_Minh';

logger.warn(`morningSchedule is running at ${new Date()}`);

rule.second = config.jobs.fithou.second;

import { crawlFithouJob } from './crawlFithouJob';
import { morningSchedule, noonSchedule, eveningSchedule } from './schoolSchedule';

const runjobs = () => {
  schedule.scheduleJob(rule, crawlFithouJob);
  scheduler.addSimpleIntervalJob(crawlCtmsJob);

  schedule.scheduleJob('00 00 7 * * 0-6', morningSchedule);
  schedule.scheduleJob('00 30 12 * * 0-6', noonSchedule);
  schedule.scheduleJob('00 30 17 * * 0-6', eveningSchedule);

  console.log(scheduler.getById(job.id).getStatus());
};

export default runjobs;
