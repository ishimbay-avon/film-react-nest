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

// import { Test, TestingModule } from '@nestjs/testing';
// import { FilmsService } from './films.service';
// import { fixtures } from './films.fixtures';

// describe('FilmsService', () => {
//   let service: FilmsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [FilmsService],
//     })
//       .useMocker((token) => {
//         if (token === 'REPOSITORY') {
//           return {
//             films: {
//               findAllFilms: jest.fn().mockResolvedValue(fixtures.films),
//               findFilmById: jest.fn().mockResolvedValue(fixtures.film),
//               save: jest.fn().mockResolvedValue(fixtures.film.id),
//             },
//           };
//         }
//         throw new Error(`Token ${token.toString()} not found!`);
//       })
//       .compile();

//     service = module.get<FilmsService>(FilmsService);
//   });

//   it('should be return all films', async () => {
//     expect(service).toBeDefined();
//     const films = await service.findAll();
//     expect(films).toEqual(films);
//   });

//   it('should find one film', async () => {
//     expect(service).toBeDefined();
//     const films = await service.findOne('11');
//     expect(films).toEqual(fixtures.films);
//   });

//   it('should save film', async () => {
//     expect(service).toBeDefined();
//     const id = await service.create(fixtures.film);
//     expect(id).toEqual(fixtures.film.id);
//   });
// });

// import { Test, TestingModule } from '@nestjs/testing';
// import { FilmsService } from './films.service';
// import { GetFilmDTO } from './dto/films.dto';

// const mockFilm: GetFilmDTO = {
//   id: '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
//   rating: 8.1,
//   director: 'Амелия Хьюз',
//   tags: ['Рекомендуемые'],
//   image: '/bg6s.jpg',
//   cover: '/bg6c.jpg',
//   title: 'Сон в летний день',
//   about:
//     'Фэнтези-фильм о группе друзей попавших в волшебный лес, где время остановилось.',
//   description:
//     'Причудливый фэнтези-фильм, действие которого происходит в волшебном лесу, где время остановилось. Группа друзей натыкается на это заколдованное царство и поначалу проникается беззаботным духом обитателей, но потом друзьям приходится разойтись. А как встретиться снова, если нет ни времени, ни места встречи?',
//   schedule: [
//     {
//       id: '5274c89d-f39c-40f9-bea8-f22a22a50c8a',
//       daytime: '2024-06-28T10:00:53+03:00',
//       hall: 0,
//       rows: 5,
//       seats: 10,
//       price: 350,
//       taken: ['1:2'],
//     },
//   ],
// };

// const mockFilms = {
//   page: 1,
//   size: 1,
//   total: 1,
//   items: [mockFilm],
// };

// // describe('FilmsService', () => {
// //   let service: FilmsService;

// //   beforeEach(async () => {
// //     const mockRepository = {
// //       films: {
// //         findAllFilms: jest.fn().mockResolvedValue(films),
// //         findFilmById: jest.fn().mockResolvedValue(film),
// //         save: jest.fn().mockResolvedValue(film.id),
// //       },
// //     };

// //     const module: TestingModule = await Test.createTestingModule({
// //       providers: [FilmsService],
// //     })
// //       .useMocker((token) => {
// //         if (token === 'FILMS_REPOSITORY') {
// //           return mockRepository;
// //         }
// //         throw new Error(`Token ${token.toString()} not found!`);
// //       })
// //       .compile();

// //     service = module.get<FilmsService>(FilmsService);
// //   });

// //   it('should be defined', () => {
// //     expect(service).toBeDefined();
// //   });

// //   it('should return all films', async () => {
// //     const result = await service.findAll();
// //     expect(result).toEqual(films);
// //   });

// //   it('should find one film', async () => {
// //     const result = await service.findOne(
// //       '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
// //     );
// //     expect(result).toEqual(film);
// //   });

// //   it('should save film', async () => {
// //     const id = await service.create(film);
// //     expect(id).toEqual(film.id);
// //   });
// // });

// //import { Test, TestingModule } from '@nestjs/testing';
// //import { FilmsService } from './films.service';

// // Тестовые данные
// // const mockFilm = {
// //   id: '1',
// //   title: 'Test Film',
// // };
// // const mockFilms = {
// //   items: [mockFilm],
// //   total: 1,
// // };

// describe('FilmsService', () => {
//   let service: FilmsService;

//   // Мок репозитория с нужными методами
//   const mockFilmsRepository = {
//     findAll: jest.fn().mockResolvedValue(mockFilms),
//     findById: jest.fn().mockResolvedValue(mockFilm),
//     create: jest.fn().mockResolvedValue(mockFilm),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         FilmsService,
//         {
//           provide: 'FILMS_REPOSITORY',
//           useValue: mockFilmsRepository,
//         },
//       ],
//     }).compile();

//     service = module.get<FilmsService>(FilmsService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('should return all films', async () => {
//     const result = await service.findAll();
//     expect(result).toEqual(mockFilms);
//     expect(mockFilmsRepository.findAll).toHaveBeenCalled();
//   });

//   it('should find one film', async () => {
//     const result = await service.findOne('1');
//     expect(result).toEqual(mockFilm);
//     expect(mockFilmsRepository.findById).toHaveBeenCalledWith('1');
//   });

//   it('should save film', async () => {
//     const result = await service.create(mockFilm);
//     expect(result).toEqual(mockFilm);
//     expect(mockFilmsRepository.create).toHaveBeenCalledWith(mockFilm);
//   });
// });
