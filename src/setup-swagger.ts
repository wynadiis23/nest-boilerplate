import { Logger, type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const logger = new Logger('Swagger');
  const port = process.env.PORT || 3000;

  const documentBuilder = new DocumentBuilder()
    .setTitle('Travela API')
    .setDescription(`REST API Documentation for Travela`)
    .addBearerAuth()
    .setVersion('1.0');

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  logger.log(`Documentation: http://localhost:${port}/docs`);
}
