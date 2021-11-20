import {Router} from 'express';
import {createValidator} from 'express-joi-validation';

import {create, getAll, getOne, remove, update, getAutoSuggestUsers, addUsersToGroup} from '../controllers/user.controller';
import {bodyUserSchema, queryUserSchema} from '../validations/user.schema';
import {bodyUsersToGroupSchema} from '../validations/group.schema';

const validator = createValidator();

const usersRouter = Router({caseSensitive: false});

usersRouter.get('/', getAll);

usersRouter.get('/getautosuggestusers', validator.query(queryUserSchema, {joi: {convert: true, allowUnknown: false}}), getAutoSuggestUsers);

usersRouter.get('/:id', getOne);

usersRouter.post('/', validator.body(bodyUserSchema, {joi: {convert: true, allowUnknown: false}}), create);

usersRouter.put('/:id', validator.body(bodyUserSchema, {joi: {convert: true, allowUnknown: false}}), update);

usersRouter.delete('/:id', remove);

usersRouter.post('/adduserstogroup', validator.body(bodyUsersToGroupSchema, {joi: {convert: true, allowUnknown: false}}), addUsersToGroup);

export default usersRouter;
