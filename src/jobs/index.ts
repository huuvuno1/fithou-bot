import config from 'config';
import schedule from 'node-schedule';
import { ToadScheduler } from 'toad-scheduler';
import job from './crawlCtmsSubject';
import crawlCtmsJob from './crawlCtmsSubject';

const scheduler = new ToadScheduler();

const rule = new schedule.RecurrenceRule();
rule.second = config.jobs.fithou.second;

import { crawlFithouJob } from './crawlFithouJob';

const runjobs = () => {
  schedule.scheduleJob(rule, crawlFithouJob);
  scheduler.addSimpleIntervalJob(crawlCtmsJob);
  console.log(scheduler.getById(job.id).getStatus());
};

export default runjobs;
