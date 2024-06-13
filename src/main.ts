import * as express from 'express';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import helmet from 'helmet';
import { HttpExceptionFilter } from './common/exceptions/http-filter.exception';
import { setupSwagger } from './setup-swagger';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));

  // enable API versioning, by URI
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(express.json());

  app.use(
    express.urlencoded({
      extended: true,
    }),
  );

  // enable global prefix
  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });

  app.use(
    express.urlencoded({
      extended: true,
    }),
  );

  const configService = app.get<ConfigService>(ConfigService);

  const APP_FRONTEND_DOMAIN = configService.get('APP_FRONT_END_DOMAIN');

  const whitelistDomain =
    APP_FRONTEND_DOMAIN == '*' ? '*' : APP_FRONTEND_DOMAIN.split(',');

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: whitelistDomain,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(helmet({ crossOriginResourcePolicy: false }));

  setupSwagger(app);
  await app.listen(port);
}
bootstrap();
