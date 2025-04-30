import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async createOrder(@Body() order: CreateOrderDto) {
    const tickets = await this.orderService.createOrder(order);

    return {
      total: tickets.length,
      items: tickets,
    };
  }
}
