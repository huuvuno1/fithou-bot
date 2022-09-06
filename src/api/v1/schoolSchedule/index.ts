import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import { authenticationMiddleware } from 'middlewares/auth';
import * as controller from './controller';

const router = Router();

router.get('/', authenticationMiddleware, asyncRouteHandler(controller.schoolSchedule));

export default router;
