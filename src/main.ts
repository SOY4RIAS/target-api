import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { Logger } from '@nestjs/common';
import { configApp, configSwagger } from '@common/helper/config.helper';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const env = configService.get<string>('NODE_ENV');

  configApp(app);
  configSwagger(app, env);

  await app.listen(port, () => {
    Logger.log(`PORT: ${port}`, 'Bootstrap');
  });
}
bootstrap();
