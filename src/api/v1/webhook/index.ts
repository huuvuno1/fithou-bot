import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import { verifyWebhook, handleWebhook } from './controller';

const router = Router();

router.get('/', asyncRouteHandler(verifyWebhook));
router.post('/', asyncRouteHandler(handleWebhook));

export default router;
