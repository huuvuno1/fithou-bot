import { Router } from 'express';
import { asyncRouteHandler } from 'middlewares';
import * as controller from './controller';

const router = Router();

router.get('/', asyncRouteHandler(controller.crawlFithou));
router.post('/send', asyncRouteHandler(controller.sendCrawlToSubscriber));
router.get('/redirect', asyncRouteHandler(controller.testRedirect));

export default router;
