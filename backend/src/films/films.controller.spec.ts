import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

// Мок сервиса с минимально необходимыми методами
const mockFilmsService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
};

describe('FilmsController', () => {
  let controller: FilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all films', async () => {
    mockFilmsService.findAll.mockResolvedValueOnce({ items: [], total: 0 });
    const result = await controller.findAll();
    expect(result).toEqual({ items: [], total: 0 });
  });
});

// import { Test, TestingModule } from '@nestjs/testing';
// import { FilmsController } from './films.controller';
// import { FilmsService } from './films.service';
// import { GetFilmDTO } from './dto/films.dto';

// // Фикстуры прямо в тесте
// const film: GetFilmDTO = {
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

// const films = {
//   page: 1,
//   size: 1,
//   total: 1,
//   items: [film],
// };

// describe('FilmsController', () => {
//   let controller: FilmsController;

//   beforeEach(async () => {
//     const mockFilmsService = {
//       findAll: jest.fn().mockResolvedValue(films),
//       findById: jest.fn().mockResolvedValue(film),
//     };

//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [FilmsController],
//       providers: [
//         {
//           provide: FilmsService,
//           useValue: mockFilmsService,
//         },
//       ],
//     }).compile();

//     controller = module.get<FilmsController>(FilmsController);
//   });

//   it('should be return all films', async () => {
//     expect(controller).toBeDefined();
//     const result = await controller.findAll();
//     expect(result).toEqual(films);
//   });

//   it('should find one schedule', async () => {
//     expect(controller).toBeDefined();
//     const result = await controller.getSchedule(
//       '92b8a2a7-ab6b-4fa9-915b-d27945865e39',
//     );
//     expect(result).toEqual({
//       total: film.schedule.length,
//       items: film.schedule,
//     });
//   });
// });

// import { Test, TestingModule } from '@nestjs/testing';
// import { FilmsController } from './films.controller';
// import { FilmsService } from './films.service';

// // Моки для фильмов и расписания
// const mockSchedule = [
//   {
//     id: '5274c89d-f39c-40f9-bea8-f22a22a50c8a',
//     daytime: '2024-06-28T10:00:53+03:00',
//     hall: 0,
//     rows: 5,
//     seats: 10,
//     price: 350,
//     taken: ['1:2'],
//   },
// ];

// const mockFilm = {
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
//   schedule: mockSchedule,
// };

// const mockFilmsResult = {
//   items: [mockFilm],
//   total: 1,
// };

// describe('FilmsController', () => {
//   let controller: FilmsController;
//   let filmsService: FilmsService;

//   beforeEach(async () => {
//     const mockFilmsService = {
//       findAll: jest.fn().mockResolvedValue(mockFilmsResult),
//       findOne: jest.fn().mockResolvedValue({
//         items: mockSchedule,
//         total: mockSchedule.length,
//       }),
//     };

//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [FilmsController],
//       providers: [
//         {
//           provide: FilmsService,
//           useValue: mockFilmsService,
//         },
//       ],
//     }).compile();

//     controller = module.get<FilmsController>(FilmsController);
//     filmsService = module.get<FilmsService>(FilmsService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   it('should be return all films', async () => {
//     const result = await controller.findAll();
//     expect(result).toEqual(mockFilmsResult);
//     expect(filmsService.findAll).toHaveBeenCalled();
//   });

//   it('should find one schedule', async () => {
//     const result = await controller.getSchedule(mockFilm.id);
//     expect(result).toEqual({
//       items: mockSchedule,
//       total: mockSchedule.length,
//     });
//     expect(filmsService.findOne).toHaveBeenCalledWith(mockFilm.id);
//   });
// });
