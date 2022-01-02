import {NextFunction, Request, Response} from 'express';
import {UNAUTHORIZED, FORBIDDEN} from 'http-status';
import jwt from 'jsonwebtoken';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-access-token');

  if (!token) {
    return res.status(UNAUTHORIZED).send({success: false, message: 'No token provided.'});
  }

  return jwt.verify(token, process.env.JWT_SECRET as string, (err, decoder) => {
    if (err) {
      return res.status(FORBIDDEN).send({success: false, message: 'Failed to authenticate token.'});
    }

    return next();
  });
};
