import {Request, Response} from 'express';
import {ValidatedRequest} from 'express-joi-validation';
import {CREATED, INTERNAL_SERVER_ERROR, NO_CONTENT, NOT_FOUND, OK} from 'http-status';

import {BaseGroup, Group, GroupInstance} from 'types/group';
import {GroupRequestSchema} from 'validations/group.schema';

import * as GroupService from '../services/group.service';

export const getAll = async (req: Request, res: Response) => {
  try {
    const groups: Group[] = await GroupService.findAll();

    res.status(OK).send(groups);
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).send((e as Error).message);
  }
};

export const getOne = async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const group: GroupInstance | null = await GroupService.findOne(id);

    if (group) {
      return res.status(OK).send(group.toJSON());
    }

    return res.status(NOT_FOUND).send('group not found');
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).send((e as Error).message);
  }
};

export const create = async (req: ValidatedRequest<GroupRequestSchema>, res: Response) => {
  try {
    const group = req.body;

    const newGroup: GroupInstance | null = await GroupService.create(group as BaseGroup);

    res.status(CREATED).send(newGroup);
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).send((e as Error).message);
  }
};

export const update = async (req: ValidatedRequest<GroupRequestSchema>, res: Response) => {
  try {
    const {body: group, params: {id}} = req;

    const existingGroup = await GroupService.findOne(id);

    if (existingGroup) {
      const newGroup = await GroupService.update(id, group as Group);
      return res.status(OK).send(newGroup);
    }

    return res.status(NOT_FOUND).send('group not found');
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).send((e as Error).message);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;

    const existingGroup = await GroupService.findOne(id);

    if (existingGroup) {
      await GroupService.remove(id);
      return res.sendStatus(NO_CONTENT);
    }

    return res.status(NOT_FOUND).send('group not found');
  } catch (e) {
    res.status(INTERNAL_SERVER_ERROR).send((e as Error).message);
  }
};
