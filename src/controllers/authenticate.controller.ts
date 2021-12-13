import {Request, Response} from 'express';
import {INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED} from 'http-status';
import jwt from 'jsonwebtoken';

import {UserInstance} from '../types/user';
import {handleError} from '../error-hander/errorHandlers';

import * as AuthenticateService from '../services/authenticate.service';

export const getOneByLogin = async (req: Request, res: Response) => {
  const {login, password} = req.body;

  try {
    const user: UserInstance | null = await AuthenticateService.findOneByLogin(login);

    if (!user || user?.password !== password || user?.isDeleted) {
      return res.status(UNAUTHORIZED).send({
        success: false,
        message: 'Bad username/password combination.',
      });
    }

    const payload = {id: user.id};
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: 200});

    res.status(OK).send(token);
  } catch (error) {
    handleError(error as Error, req, res);
    res.status(INTERNAL_SERVER_ERROR).send((error as Error).message);
  }
};
