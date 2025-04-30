import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFilmDto } from '../films/dto/films.dto';

@Schema()
class ScheduleItem {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  daytime: string;

  @Prop({ required: true })
  hall: number;

  @Prop({ required: true })
  rows: number;

  @Prop({ required: true })
  seats: number;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], default: [] })
  taken: string[];
}

@Schema({ timestamps: true })
export class Film extends Document {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, min: 0, max: 5 })
  rating: number;

  @Prop({ required: true })
  director: string;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  cover: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  about: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [ScheduleItem], required: true })
  schedule: ScheduleItem[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);

export interface ScheduleItemWithFilm extends ScheduleItem {
  film: string;
}

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const createdFilm = new this.filmModel(createFilmDto);
    return createdFilm.save();
  }

  async findAll(): Promise<{ items: Film[]; total: number }> {
    const [items, total] = await Promise.all([
      this.filmModel.find().exec(),
      this.filmModel.countDocuments().exec(),
    ]);

    return { items, total };
  }

  async findById(
    id: string,
  ): Promise<{ items: ScheduleItemWithFilm[]; total: number }> {
    const film = await this.filmModel.findOne({ id }).exec();

    if (!film) {
      return { items: [], total: 0 };
    }

    const filmObject = film.toObject();

    const items: ScheduleItemWithFilm[] = filmObject.schedule.map(
      (session) => ({
        ...session,
        film: film.title,
      }),
    );

    return { items, total: items.length };
  }

  async updateFilmSession(
    filmId: string,
    sessionId: string,
    takenSeats: string[],
  ): Promise<void> {
    await this.filmModel
      .updateOne(
        { id: filmId, 'schedule.id': sessionId },
        { $set: { 'schedule.$.taken': takenSeats } },
      )
      .exec();
  }
}
