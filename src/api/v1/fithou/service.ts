import { NextFunction, Request } from 'express';
import { crawlFithouService } from 'services/fithou';

export const crawlFithou = async (req: Request, next: NextFunction) => {
  try {
    const result = await crawlFithouService();

    return result;
  } catch (error) {
    next(error);
  }
};
