import { Router } from 'express';
import healthRouter from './health';
import crawlFithouRouter from './fithou';

const router = Router();

router.use('/health', healthRouter);
router.use('/crawl-fithou', crawlFithouRouter);

export default router;
