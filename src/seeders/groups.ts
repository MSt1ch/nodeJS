import {QueryInterface} from 'sequelize';
import {v4 as uuid} from 'uuid';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('groups', [
      {
        id: uuid(),
        name: 'group',
        permissions: ['READ', 'WRITE'],
      },
      {
        id: uuid(),
        name: 'group2',
        permissions: ['READ'],
      },
    ]);

    return process.exit();
  },
  down: async (queryInterface: QueryInterface) => {
    // @ts-ignore
    await queryInterface.bulkDelete('groups', null, {});
    return process.exit();
  },
};
