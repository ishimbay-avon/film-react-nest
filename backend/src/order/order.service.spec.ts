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
