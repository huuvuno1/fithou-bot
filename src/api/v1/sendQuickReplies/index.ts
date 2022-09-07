import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import { authenticationMiddleware } from 'middlewares/auth';
import * as controller from './controller';

const router = Router();

router.post('/', authenticationMiddleware, asyncRouteHandler(controller.quickRepliesService));

export default router;
