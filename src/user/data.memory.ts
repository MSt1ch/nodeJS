import {v4} from 'uuid';
import {User} from 'user/user.interface';

const usersData: User[] = [
  {
    id: v4(),
    login: 'superAdmin',
    password: 'superA@',
    isDeleted: false,
    age: 20,
  },
];

export default usersData;

