import debug from 'debug';
import {NextFunction, Request, Response} from 'express';

export const logger = (message: string): any => {
  return debug('app:server')(message);
};

export const loggerHandler = (req: Request, res: Response, next: NextFunction) => {
  debug('app:handler')(`Date: ${new Date()}, Method:${req.method}, URL:${req.url}, BODY:${JSON.stringify(req.body)}`);
  return next();
};
