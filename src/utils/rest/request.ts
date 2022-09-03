import { Request } from 'express';

/**
 * Interface to add extra modifiers to request.
 */
export default interface RequestWithUser extends Request {
  // To use userId and role, please inject the same in a middleware, by decoding an access token.
  userId: string; // Zalo Id
  customerId: number;
  customerToken: string;
  role: string;
  startTime?: number;
  userAgent?: { [key: string]: any };
  searchParams?: any; // TODO: perhaps change to Dto and add validation,
  appName: string;
}
