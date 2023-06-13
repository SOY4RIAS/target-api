import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(port, () => {
    Logger.log(`PORT: ${port}`, 'Bootstrap');
  });
}
bootstrap();
