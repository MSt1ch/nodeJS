import {Router} from 'express';
import {create, getAll, getOne, remove, update, getAutoSuggestUsers} from '../user/user.controller';
import {createValidator} from 'express-joi-validation';
import {bodyUserSchema, queryUserSchema} from '../user/user.schema';

const validator = createValidator();

const usersRouter = Router({caseSensitive: false});

usersRouter.get('/', getAll);

usersRouter.get('/getautosuggestusers', validator.query(queryUserSchema, {joi: {convert: true, allowUnknown: false}}), getAutoSuggestUsers);

usersRouter.get('/:id', getOne);

usersRouter.post('/', validator.body(bodyUserSchema, {joi: {convert: true, allowUnknown: false}}), create);

usersRouter.put('/:id', validator.body(bodyUserSchema, {joi: {convert: true, allowUnknown: false}}), update);

usersRouter.delete('/:id', remove);

export default usersRouter;
