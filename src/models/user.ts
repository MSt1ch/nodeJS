import {DataTypes} from 'sequelize';
import sq from '../utils/sequelize';
import {UserInstance} from 'types/user';

export const User = sq.define<UserInstance>('users', {
  id: {
    primaryKey: true,
    type: new DataTypes.STRING(255),
  },
  login: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  createdAt: false,
  updatedAt: false,
});
