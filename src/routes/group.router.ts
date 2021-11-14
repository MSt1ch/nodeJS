import {Router} from 'express';
import {create, getAll, getOne, remove, update} from '../controllers/group.controller';

const groupsRouter = Router({caseSensitive: false});

groupsRouter.get('/', getAll);

groupsRouter.get('/:id', getOne);

groupsRouter.post('/', create);

groupsRouter.put('/:id', update);

groupsRouter.delete('/:id', remove);

export default groupsRouter;
