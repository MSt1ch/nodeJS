import {Sequelize} from 'sequelize';
import pgConfig from '../../config/pgConfig';

const sq = new Sequelize({
  ...pgConfig,
  dialect: 'postgres',
});

export default sq;
