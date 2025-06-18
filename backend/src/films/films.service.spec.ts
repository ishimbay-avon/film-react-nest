import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/film.repository';

// Мок репозитория с минимально необходимыми методами
const mockFilmsRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
};

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: FilmsRepository, // Указываем зависимость
          useValue: mockFilmsRepository, // Используем мок
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Добавьте тесты для методов сервиса
  it('should return all films', async () => {
    mockFilmsRepository.findAll.mockResolvedValueOnce({ items: [], total: 0 });
    const result = await service.findAll();
    expect(result).toEqual({ items: [], total: 0 });
  });
});
