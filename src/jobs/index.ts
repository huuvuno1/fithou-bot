import config from 'config';
import schedule from 'node-schedule';
import { ToadScheduler } from 'toad-scheduler';
import job from './crawlCtmsSubject';
import crawlCtmsJob from './crawlCtmsSubject';

const scheduler = new ToadScheduler();

const rule = new schedule.RecurrenceRule();
// your timezone
rule.tz = 'Asia/Ho_Chi_Minh';

rule.second = config.jobs.fithou.second;

import { crawlFithouJob } from './crawlFithouJob';
import { eveningSchedule, morningSchedule, noonSchedule } from './schoolSchedule';

const runjobs = () => {
  schedule.scheduleJob(rule, crawlFithouJob);
  scheduler.addSimpleIntervalJob(crawlCtmsJob);

  schedule.scheduleJob('00 00 7 * * 0-6', morningSchedule);
  schedule.scheduleJob('00 30 12 * * 0-6', noonSchedule);
  schedule.scheduleJob('00 30 16 * * 0-6', eveningSchedule);

  console.log(scheduler.getById(job.id).getStatus());
};

export default runjobs;
