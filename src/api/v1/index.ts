import { Router } from 'express';
import healthRouter from './health';

const router = Router();

router.use('/health', healthRouter);
router.use('/webhook', healthRouter);

export default router;
