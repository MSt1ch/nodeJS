import {NextFunction, Request, Response} from 'express';
import {INTERNAL_SERVER_ERROR} from 'http-status';
import {logger} from '../utils/logger';

export const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(JSON.stringify({errorMessage: err.message}));
  res.status(INTERNAL_SERVER_ERROR).json({error: 'Internal Service Error'});
  next();
};

export const handleError = (err: Error, req: Request, res: Response) => {
  logger.error(`ErrorMessage: ${err.message}, Method:${req.method}, URL:${req.url}, BODY:${JSON.stringify(req.body)}`);
};

export const handleUncaughtError = (err: Error) => {
  logger.error(JSON.stringify({errorMessage: err.message}));
};
