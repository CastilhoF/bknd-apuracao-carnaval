import * as Joi from '@hapi/joi';

export const configEnvironmentsValidation = Joi.object({
  STAGE: Joi.string().required(),
  HOST: Joi.string().required(),
  PORT: Joi.number().required(),
  HOST_MYSQL: Joi.string(),
  PORT_MYSQL: Joi.number(),
  USER_MYSQL: Joi.string(),
  PWD_MYSQL: Joi.string(),
  DB_MYSQL: Joi.string(),
  LOGGING_MYSQL: Joi.boolean(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES: Joi.number().required(),
});
