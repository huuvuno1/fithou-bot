import { NextFunction, Request } from 'express';
import { sendQuickReplies } from 'services/facebook';

export const quickRepliesService = async (req: Request, next: NextFunction) => {
  try {
    const { id, text, quick_replies } = req.body;
    const result = await sendQuickReplies(id, text, quick_replies);
    return result;
  } catch (error) {
    next(error);
  }
};
