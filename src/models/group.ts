import sq from '../utils/sequelize';
import {GroupInstance} from '../types/group';
import {DataTypes} from 'sequelize';
import {User} from './user';

export const Group = sq.define<GroupInstance>('groups', {
  id: {
    primaryKey: true,
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  name: {
    type: new DataTypes.STRING(255),
    allowNull: false,
  },
  permissions: {
    type: new DataTypes.ARRAY(new DataTypes.STRING),
    allowNull: false,
  },
},
{
  createdAt: false,
  updatedAt: false,
});


User.belongsToMany(Group, {
  through: 'user_groups',
  as: 'groups',
  foreignKey: 'user_id',
});

Group.belongsToMany(User, {
  through: 'user_groups',
  as: 'users',
  foreignKey: 'group_id',
});
