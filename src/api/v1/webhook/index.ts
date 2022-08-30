import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import { getWebhook } from './controller';

const router = Router();

router.get('/webhook', asyncRouteHandler(getWebhook));

export default router;
