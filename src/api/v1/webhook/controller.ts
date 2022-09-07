import config from 'config';
import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import * as service from './service';

const verifyWebhook = (request: RequestWithUser, response: Response, next: NextFunction) => {
  if (request.query['hub.verify_token'] === config.accessToken) {
    response.send(request.query['hub.challenge']);
  }
  response.send('Error, wrong validation token');
};

const handleWebhook = (request: RequestWithUser, response: Response, next: NextFunction) => {
  service.handleWebhook(request.body);
  response.status(200).send('EVENT_RECEIVED');
};

export { verifyWebhook, handleWebhook };
