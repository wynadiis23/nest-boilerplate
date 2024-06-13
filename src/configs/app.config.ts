import { registerAs } from '@nestjs/config';

export const appConfiguration = registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  appPort: +process.env.PORT,
  appFrontendDomain: process.env.APP_FRONT_END_DOMAIN,
}));
