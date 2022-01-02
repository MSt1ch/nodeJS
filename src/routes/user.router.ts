import {Router} from 'express';
import {createValidator} from 'express-joi-validation';

import {create, getAll, getOne, remove, update, getAutoSuggestUsers, addUsersToGroup} from '../controllers/user.controller';
import {bodyUserSchema, queryUserSchema} from '../validations/user.schema';
import {bodyUsersToGroupSchema} from '../validations/group.schema';
import {checkToken} from '../middlewares';

const validator = createValidator();

const usersRouter = Router({caseSensitive: false});

usersRouter.get('/', checkToken, getAll);

usersRouter.get('/getautosuggestusers', checkToken, validator.query(queryUserSchema, {joi: {convert: true, allowUnknown: false}}), getAutoSuggestUsers);

usersRouter.get('/:id', checkToken, getOne);

usersRouter.post('/', checkToken, validator.body(bodyUserSchema, {joi: {convert: true, allowUnknown: false}}), create);

usersRouter.put('/:id', checkToken, validator.body(bodyUserSchema, {joi: {convert: true, allowUnknown: false}}), update);

usersRouter.delete('/:id', checkToken, remove);

usersRouter.post('/adduserstogroup', checkToken, validator.body(bodyUsersToGroupSchema, {joi: {convert: true, allowUnknown: false}}), addUsersToGroup);

export default usersRouter;
