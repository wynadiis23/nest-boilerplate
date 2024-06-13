import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const dsConfiguration = registerAs(
  'ds',
  () =>
    ({
      type: 'postgres',
      url: process.env.DS_URL,
      database: process.env.DS_NAME,
      synchronize: process.env.DS_SYNCHRONIZE === 'true',
      // maxConnections: process.env.DS_MAX_CONNECTIONS,
      // sslEnabled: process.env.DS_SSL_ENABLED,
      // rejectUnauthorized: process.env.DS_REJECT_UNAUTHORIZED,
      // ca: process.env.DS_CA,
      // key: process.env.DS_KEY,
      // cert: process.env.DS_CERT,
    }) as PostgresConnectionOptions,
);
