import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { TSKVLogger } from './logger/tskv.logger';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useLogger(
    app.get('CONFIG').mode === 'dev'
      ? new DevLogger()
      : app.get('CONFIG').mode === 'prod' && app.get('CONFIG').logger === 'json'
        ? new JsonLogger()
        : new TSKVLogger(),
  );
  await app.listen(3000);
}
bootstrap();
