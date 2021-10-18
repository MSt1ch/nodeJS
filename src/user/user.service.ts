import {v4 as uuid} from 'uuid';

import usersData from '../user/data.memory';
import {BaseUser, User} from 'user/user.interface';

let dataMemory = usersData;

export const findAll = async (): Promise<User[]> => dataMemory;

export const findById = async (id: string): Promise<User> => dataMemory.find((user) => user.id === id) as User;

export const findOne = async (id: string): Promise<User> => findById(id);

export const create = async (newUser: BaseUser): Promise<User> => {
  const id = uuid();
  const createdUser: User = {id, ...newUser, isDeleted: false};

  dataMemory.push(createdUser);

  return createdUser;
};

export const update = async (id: string, userUpdate: BaseUser): Promise<User | null> => {
  const user = await findById(id);

  if (!user) {
    return null;
  }

  const newUser = {...user, ...userUpdate};

  dataMemory = dataMemory.map((userItem) => (userItem.id === id ? newUser : user));

  return newUser;
};

export const remove = async (id: string): Promise<null | void> => {
  const user = await findById(id);

  if (!user) {
    return null;
  }


  const newUser = {...user, isDeleted: true};

  dataMemory = dataMemory.map((userItem) => (userItem.id === id ? newUser : userItem));
  return;
};
