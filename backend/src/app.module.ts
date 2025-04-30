import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Film,
  FilmSchema,
  FilmsRepository,
} from './repository/films.repository';

@Module({
  imports: [
    MongooseModule.forRoot(configProvider.useValue.database.url),
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      serveRoot: '/content/afisha', // Базовый URL
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'), // Физический путь к файлам
      serveStaticOptions: {
        index: false, // Отключаем index.html по умолчанию
      },
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, FilmsService, OrderService, FilmsRepository],
})
export class AppModule {}
