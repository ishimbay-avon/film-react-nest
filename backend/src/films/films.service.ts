import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/film.repository';
import { CreateFilmDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findOne(id: string) {
    const film = await this.filmsRepository.findById(id);

    if (!film) {
      throw new NotFoundException('Film not found');
    }
    return film;
  }

  async create(createFilmDto: CreateFilmDto) {
    return this.filmsRepository.create(createFilmDto);
  }

  async findAll() {
    return this.filmsRepository.findAll();
  }
}

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Film } from './entities/film.entity';
// //import { Schedule } from '../schedule/entities/schedule.entity';

// @Injectable()
// export class FilmsService {
//   constructor(
//     @InjectRepository(Film)
//     private readonly filmRepository: Repository<Film>,
//     //@InjectRepository(Schedule)
//     //private readonly scheduleRepository: Repository<Schedule>,
//   ) {}

//   async findAll(): Promise<Film[]> {
//     return this.filmRepository.find();
//   }

//   async findOne(id: string): Promise<Film> {
//     const film = await this.filmRepository.findOne({
//       where: { id },
//       relations: ['schedules'],
//     });

//     if (!film) {
//       throw new NotFoundException('Film not found');
//     }
//     return film;
//   }

//   async create(filmData: Partial<Film>): Promise<Film> {
//     const film = this.filmRepository.create(filmData);
//     return this.filmRepository.save(film);
//   }
// }
