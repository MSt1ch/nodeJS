import sq from '../utils/sequelize';
import {GroupInstance} from '../types/group';
import {DataTypes} from 'sequelize';

export const Group = sq.define<GroupInstance>('groups', {
  id: {
    primaryKey: true,
    type: new DataTypes.STRING(255),
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
