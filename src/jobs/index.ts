import schedule from 'node-schedule';
import config from 'config';

const rule = new schedule.RecurrenceRule();
rule.minute = config.jobs.fithou.minute;

import { crawlFithouJob } from './crawlFithouJob';

const runjobs = () => {
  schedule.scheduleJob(rule, crawlFithouJob);
};

export default runjobs;
