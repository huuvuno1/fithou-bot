import schedule from 'node-schedule';
import config from 'config';

const rule = new schedule.RecurrenceRule();
rule.second = config.jobs.fithou.second;

import { crawlFithouJob } from './crawlFithouJob';

const runjobs = () => {
  schedule.scheduleJob(rule, crawlFithouJob);
};

export default runjobs;
