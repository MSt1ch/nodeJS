import {UserInstance} from '../types/user';
import {User as UserModel} from '../models/user';


export const findOneByLogin = async (login: string): Promise<UserInstance | null> => await UserModel
    .findOne({where: {login, isDeleted: false}});
