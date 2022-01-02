import {Router} from 'express';
import {createValidator} from 'express-joi-validation';

import {create, getAll, getOne, remove, update} from '../controllers/group.controller';
import {bodyGroupSchema} from '../validations/group.schema';
import {checkToken} from '../middlewares';

const validator = createValidator();

const groupsRouter = Router({caseSensitive: false});

groupsRouter.get('/', checkToken, getAll);

groupsRouter.get('/:id', checkToken, getOne);

groupsRouter.post('/', checkToken, validator.body(bodyGroupSchema, {joi: {convert: true, allowUnknown: false}}), create);

groupsRouter.put('/:id', checkToken, validator.body(bodyGroupSchema, {joi: {convert: true, allowUnknown: false}}), update);

groupsRouter.delete('/:id', checkToken, remove);

export default groupsRouter;
