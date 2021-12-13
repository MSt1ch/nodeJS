import * as Joi from 'joi';
import {ValidatedRequestSchema, ContainerTypes} from 'express-joi-validation';
import 'joi-extract-type';

export const bodyAuthenticateSchema = Joi.object({
  login: Joi.string().required().alphanum().min(3).max(30),
  password: Joi.string().required().pattern(new RegExp('(?:\\d+[a-z]|[a-z]+\\d)[a-z\\d]*')).min(3).max(30),
});

export interface AuthenticateRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Joi.extractType<typeof bodyAuthenticateSchema>;
}
