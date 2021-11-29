import {v4 as uuid} from 'uuid';

import {BaseUser, UpdateUser, User, UserInstance} from 'types/user';
import {User as UserModel} from '../models/user';
import {Group as GroupModel} from '../models/group';
import sq from '../utils/sequelize';

export const findAll = async (): Promise<UserInstance[]> => await UserModel
    .findAll({attributes: {exclude: ['isDeleted']}, where: {isDeleted: false}});

export const findOne = async (id: string): Promise<UserInstance | null> => await UserModel
    .findByPk(id, {attributes: {exclude: ['isDeleted']}});

export const create = async (newUser: BaseUser): Promise<UserInstance | null> => {
  const id = uuid();
  const createdUser: User = {id, ...newUser, isDeleted: false};

  const userInstance = await UserModel.create(createdUser);

  return userInstance;
};

export const update = async (id: string, userUpdate: UpdateUser): Promise<User | null> => {
  const user = await findOne(id);

  if (!user) {
    return null;
  }

  const newUser = {...user, ...userUpdate};
  // eslint-disable-next-line no-unused-vars
  const [_, userList] = await UserModel.update({...newUser}, {
    where: {
      id: user.id,
    },
    returning: true,
  });

  return userList[0];
};

export const remove = async (id: string): Promise<null | void> => {
  const user = await findOne(id);

  if (!user) {
    return null;
  }

  await sq.model('user_groups').destroy({
    where: {
      user_id: id,
    },
  });

  const newUser = {...user, isDeleted: true};

  await UserModel.update(newUser, {where: {
    id: user.id,
  }});

  return;
};

export const addUsersToGroup = async (userIds: string[], groupId: string): Promise<void> => {
  const transaction = await sq.transaction();

  const group = await GroupModel.findByPk(groupId, {transaction});

  if (!group) {
    await transaction.rollback();
    throw new Error(`Group ${groupId} is not exist.`);
  };

  const users = userIds.map(async (userId) => {
    const user = await UserModel.findByPk(userId, {transaction});
    if (!user || user.isDeleted) {
      await transaction.rollback();
      throw new Error(`User ${userId} is not exist.`);
    }
    return user;
  });

  return Promise.all(users).then((usersData) => {
    const addGroupToUser = usersData.map(async (user) => {
      // @ts-ignore
      return await user.addGroups(group, {transaction});
    });

    return Promise.all(addGroupToUser).then(() => {
      transaction.commit();
      return Promise.resolve();
    }).catch((err) => {
      transaction.rollback();
      return Promise.reject(err);
    });
  });
};
