import {QueryInterface} from 'sequelize';
import {v4 as uuid} from 'uuid';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('users', [
      {
        id: uuid(),
        login: 'admin',
        password: 'admin123456',
        age: 30,
        isDeleted: false,
      },
      {
        id: uuid(),
        login: 'superAdmin',
        password: 'sadmin5432',
        age: 20,
        isDeleted: false,
      },
      {
        id: uuid(),
        login: 'guest',
        password: 'guest111',
        age: 50,
        isDeleted: false,
      },
      {
        id: uuid(),
        login: 'justAsk',
        password: 'ask???',
        age: 50,
        isDeleted: false,
      },
    ]);

    return process.exit();
  },
  down: async (queryInterface: QueryInterface) => {
    // @ts-ignore
    await queryInterface.bulkDelete('users', null, {});
    return process.exit();
  },
};
