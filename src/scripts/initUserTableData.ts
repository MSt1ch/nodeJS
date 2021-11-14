import user from '../seeders/users';
import sq from '../utils/sequelize';

sq.sync().then(({getQueryInterface}) => {
  user.up(sq.getQueryInterface());
});
