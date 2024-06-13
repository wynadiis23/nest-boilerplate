// eslint-disable-next-line @typescript-eslint/naming-convention
import * as Joi from 'joi';

export const schemaValidation = Joi.object({
  // Database Configuration
  DS_URL: Joi.string().required(),
  DS_NAME: Joi.string().required(),
  DS_SYNCHRONIZE: Joi.boolean().default(false),
});
