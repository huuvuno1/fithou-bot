import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import * as controller from './controller';

const router = Router();

router.post('/', asyncRouteHandler(controller.login));
router.post('/send', asyncRouteHandler(controller.sendNotiForUserOfCTMS));

export default router;
