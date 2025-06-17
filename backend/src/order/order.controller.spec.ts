// import { Test, TestingModule } from '@nestjs/testing';
// import { OrderController } from './order.controller';
// import { OrderService } from './order.service';
// import { CreateOrderDto } from './dto/order.dto';

// describe('OrderController', () => {
//   let controller: OrderController;
//   let service: OrderService;

//   beforeEach(async () => {
//     const mockOrderService = {
//       createOrder: jest
//         .fn()
//         .mockImplementation(async (order: CreateOrderDto) => {
//           return order.tickets.map((ticket, index) => ({
//             id: `order-id-${index}`,
//             film: ticket.film,
//             session: ticket.session,
//             daytime: '2025-01-01T18:00:00+03:00',
//             row: ticket.row,
//             seat: ticket.seat,
//             price: 350,
//           }));
//         }),
//     };

//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [OrderController],
//       providers: [
//         {
//           provide: OrderService,
//           useValue: mockOrderService,
//         },
//       ],
//     }).compile();

//     controller = module.get<OrderController>(OrderController);
//     service = module.get<OrderService>(OrderService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   it('.createOrder() should call OrderService.createOrder and return the result', async () => {
//     const orderData: CreateOrderDto = {
//       tickets: [
//         {
//           film: 'filmId',
//           session: 'sessionId',
//           row: 1,
//           seat: 1,
//         },
//         {
//           film: 'filmId',
//           session: 'sessionId',
//           row: 1,
//           seat: 2,
//         },
//       ],
//       contacts: {
//         email: 'test@example.com',
//         phone: '+79001234567',
//       },
//     };

//     const expectedItems = orderData.tickets.map((ticket, index) => ({
//       id: `order-id-${index}`,
//       film: ticket.film,
//       session: ticket.session,
//       daytime: '2025-01-01T18:00:00+03:00',
//       row: ticket.row,
//       seat: ticket.seat,
//       price: 350,
//     }));

//     const result = await controller.createOrder(orderData);

//     expect(service.createOrder).toHaveBeenCalledWith(orderData);
//     expect(result).toEqual({
//       total: orderData.tickets.length,
//       items: expectedItems,
//     });
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  const mockOrderService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('.createOrder() should call OrderService.createOrder and return the result', async () => {
    const orderData = {
      tickets: [
        {
          film: 'filmId',
          session: 'sessionId',
          row: 1,
          seat: 1,
        },
      ],
      contacts: {
        email: 'test@example.com',
        phone: '+79001234567',
      },
    };

    const mockResult = [
      {
        id: 'order-id-1',
        film: 'filmId',
        session: 'sessionId',
        daytime: '2025-01-01T18:00:00+03:00',
        row: 1,
        seat: 1,
        price: 350,
      },
    ];

    mockOrderService.createOrder.mockResolvedValueOnce(mockResult);

    const result = await controller.createOrder(orderData);

    expect(service.createOrder).toHaveBeenCalledWith(orderData);
    expect(result).toEqual({
      total: mockResult.length,
      items: mockResult,
    });
  });
});
