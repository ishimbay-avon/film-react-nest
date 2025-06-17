import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { FilmsRepository } from '../repository/film.repository';
import { CreateOrderDto, OrderResultDto, TicketDto } from './dto/order.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(order: CreateOrderDto): Promise<OrderResultDto[]> {
    const results: OrderResultDto[] = [];

    // Группируем билеты по фильмам и сеансам
    const ticketsByFilmSession = this.groupTickets(order.tickets);

    for (const [filmId, sessions] of Object.entries(ticketsByFilmSession)) {
      const schedules = await this.filmsRepository.findSchedulesForFilm(
        filmId,
        Object.keys(sessions),
      );

      if (schedules.length === 0) {
        throw new NotFoundException(`Фильм с id ${filmId} не найден`);
      }

      for (const schedule of schedules) {
        const tickets = sessions[schedule.id];
        if (!tickets) continue;

        const takenSeats = schedule.taken.split(',').filter(Boolean);

        // Проверяем и резервируем места
        for (const ticket of tickets) {
          const seatKey = `${ticket.row}:${ticket.seat}`;

          if (takenSeats.includes(seatKey)) {
            throw new ConflictException(`Место ${seatKey} уже занято`);
          }

          takenSeats.push(seatKey);
          results.push({
            id: faker.string.uuid(),
            film: filmId,
            session: schedule.id,
            daytime: schedule.daytime,
            row: ticket.row,
            seat: ticket.seat,
            price: schedule.price,
          });
        }

        await this.filmsRepository.updateFilmSession(
          filmId,
          schedule.id,
          takenSeats,
        );
      }
    }

    return results;
  }

  private groupTickets(
    tickets: TicketDto[],
  ): Record<string, Record<string, TicketDto[]>> {
    return tickets.reduce((acc, ticket) => {
      if (!acc[ticket.film]) {
        acc[ticket.film] = {};
      }
      if (!acc[ticket.film][ticket.session]) {
        acc[ticket.film][ticket.session] = [];
      }
      acc[ticket.film][ticket.session].push(ticket);
      return acc;
    }, {});
  }
}
