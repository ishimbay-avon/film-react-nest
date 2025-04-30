import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
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
