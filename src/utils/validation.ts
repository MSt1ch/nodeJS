import {NextFunction, Request, Response} from 'express';
import {ContainerTypes, ExpressJoiError} from 'express-joi-validation';

export const validationErrorHandler = (err: any|ExpressJoiError, req: Request, res: Response, next: NextFunction) => {
  if (err && err.type in ContainerTypes) {
    const e: ExpressJoiError = err;
    res.status(400).end(`You submitted a bad ${e.type} parameter`);
  } else {
    res.status(500).end('internal server error');
  }
};
