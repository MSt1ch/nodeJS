import * as Joi from 'joi';
import {ValidatedRequestSchema, ContainerTypes} from 'express-joi-validation';
import 'joi-extract-type';

export const bodyUserSchema = Joi.object({
  login: Joi.string().required().alphanum().min(3).max(30),
  password: Joi.string().required().pattern(new RegExp('(?:\\d+[a-z]|[a-z]+\\d)[a-z\\d]*')).min(3).max(30),
  age: Joi.number().required().integer().min(4).max(130),
  isDeleted: Joi.boolean(),
});

export const queryUserSchema = Joi.object({
  loginsubstring: Joi.string().required(),
  limit: Joi.number().required(),
});

export interface UserRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof bodyUserSchema>;
}

export interface UserQuerySchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: Joi.extractType<typeof queryUserSchema>;
}
