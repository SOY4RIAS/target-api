import * as fs from 'fs';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as YAML from 'yaml';

export const configApp = (app: INestApplication) => {
  app.setGlobalPrefix('api/v1');
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
};

export const configSwagger = (app: INestApplication, env: string) => {
  const options = new DocumentBuilder()
    .setTitle('Target-API')
    .setDescription('Target-API v2 training project')
    .setVersion('1.0')
    .addTag('Target')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  if (env === 'development') {
    fs.writeFileSync('./oas3.yaml', YAML.stringify(document));
  }

  SwaggerModule.setup('api/v1/docs', app, document);
};
