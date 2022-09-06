import { Router } from 'express';
import healthRouter from './health';
import webhookRouter from './webhook';
import crawlFithouRouter from './fithou';
import ctmsRouter from './ctms';
import schoolScheduleRouter from './schoolSchedule';

const router = Router();

router.use('/health', healthRouter);
router.use('/webhook', webhookRouter);
router.use('/crawl-fithou', crawlFithouRouter);
router.use('/ctms', ctmsRouter);
router.use('/school-schedule', schoolScheduleRouter);

export default router;
