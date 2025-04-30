import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
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
      const film = await this.filmsRepository.findById(filmId);

      if (!film) {
        throw new NotFoundException(`Фильм с id ${filmId} не найден`);
      }

      for (const [sessionId, tickets] of Object.entries(sessions)) {
        const session = film.items.find((s) => s.id === sessionId);

        if (!session) {
          throw new NotFoundException(`Сеанс с id ${sessionId} не найден`);
        }

        // Проверяем и резервируем места
        for (const ticket of tickets) {
          const seatKey = `${ticket.row}:${ticket.seat}`;

          if (session.taken.includes(seatKey)) {
            throw new ConflictException(`Место ${seatKey} уже занято`);
          }

          session.taken.push(seatKey);
          results.push({
            id: faker.string.uuid(),
            film: filmId,
            session: sessionId,
            daytime: session.daytime,
            row: ticket.row,
            seat: ticket.seat,
            price: session.price,
          });
        }

        // Обновляем фильм в базе
        await this.filmsRepository.updateFilmSession(
          filmId,
          sessionId,
          session.taken,
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
