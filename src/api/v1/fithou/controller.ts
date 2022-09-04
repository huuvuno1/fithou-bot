import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

export const crawlFithou = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const results = await service.crawlFithou(request, next);
  response.status(200);
  response.send(fmt.formatResponse(results, Date.now() - request.startTime, 'OK', 1));
};

export const sendCrawlToSubscriber = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const results = await service.sendCrawlToSubscriber(request, next);
  response.status(200);
  response.send(fmt.formatResponse(results, Date.now() - request.startTime, 'OK', 1));
};

export const testRedirect = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  response.redirect('https://www.facebook.com');
};
