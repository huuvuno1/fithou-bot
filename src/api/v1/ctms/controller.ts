import { NextFunction, Response } from 'express';
import RequestWithUser from 'utils/rest/request';
import fmt from 'utils/formatter';
import * as service from './service';

const login = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const { username, password, id } = request.body;
  const results = await service.login(username, password, id);
  response.send(fmt.formatResponse(results, Date.now() - request.startTime, 'OK', 1));
};
export { login };
