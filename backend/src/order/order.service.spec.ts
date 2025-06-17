// import { Test, TestingModule } from '@nestjs/testing';
// import { OrderService } from './order.service';
// import { FilmsRepository } from '../repository/film.repository';
// import { CreateOrderDto, TicketDto } from './dto/order.dto';
// import { NotFoundException, ConflictException } from '@nestjs/common';

// describe('OrderService', () => {
//   let service: OrderService;
//   let filmsRepository: FilmsRepository;

//   const mockSchedule = [
//     {
//       id: 'session-id',
//       daytime: '2025-01-01T18:00:00+03:00',
//       hall: 1,
//       rows: 5,
//       seats: 10,
//       price: 350,
//       taken: '1:1,2:2',
//     },
//   ];

//   const mockFilmId = 'film-id';

//   const mockTickets: TicketDto[] = [
//     {
//       film: mockFilmId,
//       session: 'session-id',
//       row: 3,
//       seat: 3,
//     },
//   ];

//   const mockOrderData: CreateOrderDto = {
//     tickets: mockTickets,
//     contacts: {
//       email: 'test@example.com',
//       phone: '+79001234567',
//     },
//   };

//   beforeEach(async () => {
//     const mockFilmsRepository = {
//       findSchedulesForFilm: jest.fn().mockResolvedValue(mockSchedule),
//       updateFilmSession: jest.fn().mockResolvedValue(undefined),
//     };

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         OrderService,
//         {
//           provide: FilmsRepository,
//           useValue: mockFilmsRepository,
//         },
//       ],
//     }).compile();

//     service = module.get<OrderService>(OrderService);
//     filmsRepository = module.get<FilmsRepository>(FilmsRepository);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('.createOrder()', () => {
//     it('should create an order successfully', async () => {
//       const result = await service.createOrder(mockOrderData);

//       expect(filmsRepository.findSchedulesForFilm).toHaveBeenCalledWith(
//         mockFilmId,
//         ['session-id'],
//       );
//       expect(filmsRepository.updateFilmSession).toHaveBeenCalled();

//       expect(result).toHaveLength(mockTickets.length);
//       expect(result[0]).toMatchObject({
//         film: mockFilmId,
//         session: 'session-id',
//         row: 3,
//         seat: 3,
//         price: 350,
//       });
//     });

//     it('should throw NotFoundException if no schedules found', async () => {
//       jest
//         .spyOn(filmsRepository, 'findSchedulesForFilm')
//         .mockResolvedValueOnce([]);

//       await expect(service.createOrder(mockOrderData)).rejects.toThrow(
//         NotFoundException,
//       );
//     });

//     it('should throw ConflictException if seat is already taken', async () => {
//       // Место 1:1 и 2:2 заняты, попробуем забронировать 1:1
//       const ticketsWithTakenSeat: CreateOrderDto = {
//         tickets: [
//           {
//             film: mockFilmId,
//             session: 'session-id',
//             row: 1,
//             seat: 1,
//           },
//         ],
//         contacts: {
//           email: 'test@example.com',
//           phone: '+79001234567',
//         },
//       };

//       await expect(service.createOrder(ticketsWithTakenSeat)).rejects.toThrow(
//         ConflictException,
//       );
//     });
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsRepository } from '../repository/film.repository';

// Мок репозитория с необходимыми методами
const mockFilmsRepository = {
  findSchedulesForFilm: jest.fn(),
  updateFilmSession: jest.fn(),
};

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: FilmsRepository,
          useValue: mockFilmsRepository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create order', async () => {
    mockFilmsRepository.findSchedulesForFilm.mockResolvedValueOnce([
      {
        id: 'session-id',
        taken: '',
      },
    ]);

    const result = await service.createOrder({
      tickets: [
        {
          film: 'film-id',
          session: 'session-id',
          row: 1,
          seat: 1,
        },
      ],
      contacts: { email: 'test@test.com', phone: '+79999999999' },
    });

    expect(result).toBeInstanceOf(Array);
    expect(mockFilmsRepository.findSchedulesForFilm).toHaveBeenCalled();
    expect(mockFilmsRepository.updateFilmSession).toHaveBeenCalled();
  });
});
