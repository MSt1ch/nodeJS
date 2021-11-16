import {Request, Response} from 'express';
import {ValidatedRequest} from 'express-joi-validation';
import {OK, INTERNAL_SERVER_ERROR, NOT_FOUND, CREATED, NO_CONTENT} from 'http-status';

import _ from 'lodash';

import {BaseUser, User, UserInstance} from '../types/user';
import {UserQuerySchema, UserRequestSchema} from 'validations/user.schema';

import * as UserService from '../services/user.service';

export const getAll = async (req: Request, res: Response) => {
  try {
    const users: User[] = await UserService.findAll();

    res.status(OK).send(users);
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).send((e as Error).message);
  }
};


export const getOne = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const user: UserInstance | null = await UserService.findOne(id);

    if (user) {
      return res.status(OK).send(user.toJSON());
    }

    res.status(NOT_FOUND).send('User not found');
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).send((e as Error).message);
  }
};

export const create = async (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
  try {
    const user = req.body;

    const newUser = await UserService.create(user as BaseUser);

    res.status(CREATED).send(newUser);
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).send((e as Error).message);
  }
};

export const update = async (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
  try {
    const user = req.body;
    const id: string = req.params.id;

    const existingUser = await UserService.findOne(id);

    if (existingUser) {
      const newUser = await UserService.update(id, user as BaseUser);
      return res.status(OK).send(newUser);
    }

    res.status(NOT_FOUND).send('User not found');
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).send((e as Error).message);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const existingUser = await UserService.findOne(id);

    if (existingUser) {
      await UserService.remove(id);
      return res.sendStatus(NO_CONTENT);
    }
    return res.status(NOT_FOUND).send('User not found');
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).send((e as Error).message);
  }
};

export const getAutoSuggestUsers = async (req: ValidatedRequest<UserQuerySchema>, res: Response) => {
  const {limit, loginsubstring} = req.query;

  try {
    const users: User[] = await UserService.findAll();

    const filteredUsers = users.filter(({login}) => login.toLowerCase().includes(loginsubstring.toLowerCase()));
    const sortedUsers = _.sortBy(filteredUsers, ['login']);

    if (users) {
      res.status(OK).send(sortedUsers.slice(0, limit));
    }
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).send((e as Error).message);
  }
};

export const addUsersToGroup = async (req: Request, res: Response) => {
  const {userIds, groupId} = req.body;

  UserService.addUsersToGroup(userIds, groupId).then(() => {
    res.status(OK).send();
  }).catch((e) => {
    res.status(INTERNAL_SERVER_ERROR).send((e as Error).message);
  });
};

