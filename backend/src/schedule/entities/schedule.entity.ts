import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Film } from '../../films/entities/film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  daytime: string;

  @Column()
  hall: number;

  @Column()
  rows: number;

  @Column()
  seats: number;

  @Column({ type: 'double precision' })
  price: number;

  @Column({ default: '' })
  taken: string;

  @ManyToOne(() => Film, (film) => film.schedules)
  film: Film;
}
