import {v4 as uuid} from 'uuid';

import {BaseGroup, Group, GroupInstance} from 'types/group';
import {Group as GroupModel} from '../models/group';

export const findAll = async (): Promise<GroupInstance[]> => await GroupModel
    .findAll();

export const findOne = async (id: string): Promise<GroupInstance | null> => await GroupModel
    .findByPk(id);

export const create = async (newGroup: BaseGroup): Promise<GroupInstance | null> => {
  const id = uuid();
  const createdGroup: Group = {id, ...newGroup};

  const groupInstance = await GroupModel.create(createdGroup);

  return groupInstance;
};

export const update = async (id: string, groupUpdate: Group): Promise<Group | null> => {
  const group = await findOne(id);

  // @ts-ignore
  delete groupUpdate.id;

  if (!group) {
    return null;
  }

  const newGroup = {...group, ...groupUpdate};
  // eslint-disable-next-line no-unused-vars
  const [_, groupList] = await GroupModel.update({...newGroup}, {
    where: {
      id: group.id,
    },
    returning: true,
  });

  return groupList[0];
};

export const remove = async (id: string): Promise<null | void> => {
  const group = await findOne(id);

  if (!group) {
    return null;
  }
  await GroupModel.destroy({
    where: {
      id,
    },
  });
};
