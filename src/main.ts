import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { configApp, configSwagger } from './common/helper/config.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  configApp(app);
  configSwagger(app);

  await app.listen(port, () => {
    Logger.log(`PORT: ${port}`, 'Bootstrap');
  });
}
bootstrap();
