import { CreateFilmDto } from '../films/dto/films.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../schedule/entities/schedule.entity';

export interface ScheduleItemWithFilm {
  id: string;
  daytime: string;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string;
  film: string;
}

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const filmData = {
      ...createFilmDto,
      tags: Array.isArray(createFilmDto.tags)
        ? createFilmDto.tags.join(',')
        : createFilmDto.tags,
    };

    const film = this.filmRepository.create(filmData);
    return this.filmRepository.save(film);
  }

  async findAll(): Promise<{ items: Film[]; total: number }> {
    const [items, total] = await Promise.all([
      this.filmRepository.find(),
      this.filmRepository.count(),
    ]);

    return { items, total };
  }

  async findById(
    id: string,
  ): Promise<{ items: ScheduleItemWithFilm[]; total: number }> {
    const film = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });

    if (!film || !film.schedules) {
      return { items: [], total: 0 };
    }

    const items: ScheduleItemWithFilm[] = film.schedules.map((schedule) => ({
      id: schedule.id,
      daytime: schedule.daytime,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken,
      film: film.title,
    }));

    return { items, total: items.length };
  }

  async updateFilmSession(
    filmId: string,
    sessionId: string,
    takenSeats: string[],
  ): Promise<void> {
    await this.scheduleRepository.update(
      { id: sessionId, film: { id: filmId } },
      { taken: takenSeats.join(',') },
    );
  }

  // async updateSchedule(schedule: Schedule): Promise<Schedule> {
  //   return this.scheduleRepository.save(schedule);
  // }

  async findSchedulesForFilm(
    filmId: string,
    sessionIds: string[],
  ): Promise<Schedule[]> {
    return this.scheduleRepository.find({
      where: {
        film: { id: filmId },
        id: In(sessionIds),
      },
    });
  }
}
