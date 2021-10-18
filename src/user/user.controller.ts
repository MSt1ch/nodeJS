import {Request, Response} from 'express';
import {BaseUser, User} from 'user/user.interface';
import * as UserService from '../user/user.service';
import {ValidatedRequest} from 'express-joi-validation';
import {UserRequestSchema} from 'user/user.schema';


export const getAll = async (req: Request, res: Response) => {
  try {
    const users: User[] = await UserService.findAll();

    res.status(200).send(users);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
};


export const getOne = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const user: User = await UserService.findOne(id);

    if (user) {
      return res.status(200).send(user);
    }

    res.status(404).send('User not found');
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
};

export const create = async (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
  try {
    const user = req.body;

    const newUser = await UserService.create(user as User);

    res.status(201).send(newUser);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
};

export const update = async (req: ValidatedRequest<UserRequestSchema>, res: Response) => {
  try {
    const user = req.body;
    const id: string = req.params.id;

    const existingUser = await UserService.findOne(id);

    if (existingUser) {
      const newUser = await UserService.update(id, user as BaseUser);
      return res.status(200).send(newUser);
    }

    res.status(404).send('User not found');
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    await UserService.remove(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send((e as Error).message);
  }
};
