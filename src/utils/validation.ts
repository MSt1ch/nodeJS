import {NextFunction, Request, Response} from 'express';
import {ContainerTypes, ExpressJoiError} from 'express-joi-validation';
import {BAD_REQUEST, INTERNAL_SERVER_ERROR} from 'http-status';

export const validationErrorHandler = (err: any|ExpressJoiError, req: Request, res: Response, next: NextFunction) => {
  if (err && err.type in ContainerTypes) {
    const e: ExpressJoiError = err;
    res.status(BAD_REQUEST).end(`You submitted a bad ${e.type} parameter`);
  } else {
    res.status(INTERNAL_SERVER_ERROR).end('internal server error');
  }
};
