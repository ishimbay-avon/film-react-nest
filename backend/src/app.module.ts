import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { DataSourceOptions } from 'typeorm';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { FilmsRepository } from './repository/film.repository';
import { Film } from './films/entities/film.entity';
import { Schedule } from './schedule/entities/schedule.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRoot({
      type: configProvider.useValue.database.type,
      host: configProvider.useValue.database.host,
      port: configProvider.useValue.database.port,
      username: configProvider.useValue.database.username,
      password: configProvider.useValue.database.password,
      database: configProvider.useValue.database.database,
      entities: [Film, Schedule],
      synchronize: true,
    } as DataSourceOptions),
    TypeOrmModule.forFeature([Film, Schedule]),
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
