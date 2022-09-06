import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

export const schoolSchedule = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const results = await service.schoolSchedule(request, next);
  response.status(200);
  response.send(fmt.formatResponse(results, Date.now() - request.startTime, 'OK', 1));
};
