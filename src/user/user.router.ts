import {Router} from 'express';
import {create, getAll, getOne, remove, update} from '../user/user.controller';
import {createValidator} from 'express-joi-validation';
import {bodyUserSchema} from '../user/user.schema';

const validator = createValidator();

const usersRouter = Router();

usersRouter.get('/', getAll);

usersRouter.get('/:id', getOne);

usersRouter.post('/', validator.body(bodyUserSchema, {joi: {convert: true, allowUnknown: false}}), create);

usersRouter.put('/:id', validator.body(bodyUserSchema, {joi: {convert: true, allowUnknown: false}}), update);

usersRouter.delete('/:id', remove);


export default usersRouter;
