//TODO описать DTO для запросов к /films
import {
  IsFQDN,
  IsNotEmpty,
  IsString,
  IsArray,
  IsDateString,
  IsInt,
  IsNumber,
  IsUUID,
} from 'class-validator';

class GetScheduleDTO {
  @IsUUID()
  id: string;
  @IsDateString()
  daytime: string;
  @IsInt()
  hall: number;
  @IsInt()
  rows: number;
  @IsInt()
  seats: number;
  @IsNumber()
  price: number;
  @IsArray()
  @IsString({ each: true })
  taken: string[];
}

export class CreateFilmDto {
  @IsUUID()
  id: string;
  @IsNumber()
  rating: number;
  @IsString()
  director: string;
  tags: string[];
  @IsFQDN()
  image: string;
  @IsFQDN()
  cover: string;
  @IsString()
  title: string;
  @IsString()
  about: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  schedule: GetScheduleDTO[];
}
