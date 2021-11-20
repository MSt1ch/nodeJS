import {Router} from 'express';
import {createValidator} from 'express-joi-validation';

import {create, getAll, getOne, remove, update} from '../controllers/group.controller';
import {bodyGroupSchema} from '../validations/group.schema';

const validator = createValidator();

const groupsRouter = Router({caseSensitive: false});

groupsRouter.get('/', getAll);

groupsRouter.get('/:id', getOne);

groupsRouter.post('/', validator.body(bodyGroupSchema, {joi: {convert: true, allowUnknown: false}}), create);

groupsRouter.put('/:id', validator.body(bodyGroupSchema, {joi: {convert: true, allowUnknown: false}}), update);

groupsRouter.delete('/:id', remove);

export default groupsRouter;
