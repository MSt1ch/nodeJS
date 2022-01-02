import express from 'express';
import cors from 'cors';

import bodyParser from 'body-parser';

import {validationErrorHandler} from './utils/validation';
import {loggerMiddleware} from './utils/logger';
import {errorHandlerMiddleware} from './error-hander/errorHandlers';

import usersRouter from './routes/user.router';
import groupsRouter from './routes/group.router';
import authenticateRouter from './routes/authenticate.router';

const app = express();

app.set('case sensitive routing', false);

app.use(cors());
app.use(bodyParser.json());
// app.use(loggerHandler); // used to task 5.1
app.use(loggerMiddleware); // used to task 5.3
app.use(errorHandlerMiddleware); // used to task 5.2

app.use(validationErrorHandler);

app.use('/api/users', usersRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/login', authenticateRouter);

export default app;
