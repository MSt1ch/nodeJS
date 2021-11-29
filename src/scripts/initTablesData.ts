import user from '../seeders/users';
import group from '../seeders/groups';
import sq from '../utils/sequelize';

sq.sync().then(({getQueryInterface}) => {
  user.up(sq.getQueryInterface());
  group.up(sq.getQueryInterface());
});
