import { NextFunction, Request, Response } from 'express';
import logger from 'logger';
import config from 'config';

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authKey = req.headers.authkey;
    if (authKey === config.auth.key) {
      next();
      return;
    }

    res.status(401).send('Unauthorized');
  } catch (error) {
    logger.error(error);
  }
};
