import * as dotenv from 'dotenv';
import express from 'express';

import bodyParser from 'body-parser';

import {validationErrorHandler} from './utils/validation';
import sq from './utils/sequelize';

import usersRouter from './routes/user.router';
import groupsRouter from './routes/group.router';
import {logger, LoggerHandler} from './utils/customLogger';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

sq.sync().then(() => logger('ok'));

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.listen(PORT, () => {
  logger(`Listening on port ${PORT}`);
});

app.set('case sensitive routing', false);

app.use(bodyParser.json());
app.use(LoggerHandler);

app.use(express.json());
app.use(validationErrorHandler);

app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);
