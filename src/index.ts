import * as dotenv from 'dotenv';
import express from 'express';

import {validationErrorHandler} from './utils/validation';
import sq from './utils/sequelize';

import usersRouter from './routes/user.router';
import groupsRouter from './routes/group.router';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

sq.sync().then(() => console.log('ok'));

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.set('case sensitive routing', false);
app.use(express.json());
app.use(validationErrorHandler);
app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);
