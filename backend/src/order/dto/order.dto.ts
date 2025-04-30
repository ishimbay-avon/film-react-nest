//TODO реализовать DTO для /orders
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TicketDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsNumber()
  row: number;

  @IsNumber()
  seat: number;
}

class ContactsDto {
  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}

export class CreateOrderDto {
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  @IsArray()
  tickets: TicketDto[];

  @ValidateNested()
  @Type(() => ContactsDto)
  contacts: ContactsDto;
}

export class OrderResultDto {
  id: string;
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}
