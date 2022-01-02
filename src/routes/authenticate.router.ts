import {Router} from 'express';
import {createValidator} from 'express-joi-validation';

import {getOneByLogin} from '../controllers/authenticate.controller';
import {bodyAuthenticateSchema} from '../validations/authenticate.schema';

const validator = createValidator();

const authenticateRouter = Router({caseSensitive: false});

authenticateRouter.post('/', validator.body(bodyAuthenticateSchema, {joi: {convert: true, allowUnknown: false}}), getOneByLogin);

export default authenticateRouter;
