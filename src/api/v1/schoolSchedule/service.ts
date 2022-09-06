import { NextFunction, Request } from 'express';
import { schoolScheduleService } from 'services/ctms/schoolSchedule';

export const schoolSchedule = async (req: Request, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const result = await schoolScheduleService(username, password);

    return result;
  } catch (error) {
    next(error);
  }
};
