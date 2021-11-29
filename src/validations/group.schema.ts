import * as Joi from 'joi';
import {ValidatedRequestSchema, ContainerTypes} from 'express-joi-validation';
import 'joi-extract-type';

export const bodyUsersToGroupSchema = Joi.object({
  groupId: Joi.string().required().guid({
    version: [
      'uuidv4',
    ],
  }),
  userIds: Joi.array().required().items(Joi.string().required().guid({
    version: [
      'uuidv4',
    ],
  })),
});

export const bodyGroupSchema = Joi.object({
  name: Joi.string().required().alphanum().min(3).max(30),
  permissions: Joi.array().required().items(Joi.string().required()),
});

export interface UsersToGroupRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof bodyUsersToGroupSchema>;
}

export interface GroupRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof bodyGroupSchema>
}
