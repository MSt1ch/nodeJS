import {Model} from 'sequelize';

export interface BaseUser {
    login: string;
    password: string;
    age: number;
}

export interface User extends BaseUser {
    id: string;
    isDeleted: boolean;
}

export interface UpdateUser extends BaseUser {
    isDeleted?: boolean;
}

export interface UserInstance extends Model {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}
