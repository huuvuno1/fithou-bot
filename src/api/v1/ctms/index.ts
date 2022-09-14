import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import { authenticationMiddleware } from 'middlewares/auth';
import * as controller from './controller';

const router = Router();

router.post('/', asyncRouteHandler(controller.login));
router.post('/send', authenticationMiddleware, asyncRouteHandler(controller.sendNotiForUserOfCTMS));

export default router;
