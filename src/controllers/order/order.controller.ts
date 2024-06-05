import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { OrderService } from 'src/services/order/order.service';
import { OrderDto } from 'src/dto/order-dto';
import { Order } from '../../shemas/order';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderDto: OrderDto) {
    return await this.orderService.create(orderDto);
  }

  // @Post()
  // async initTours(@Body() data: OrderDto): Promise<Order> {
  //   // Проверка и преобразование tourId в ObjectId
  //   if (!mongoose.Types.ObjectId.isValid(data.tourId)) {
  //     throw new HttpException('Invalid tour ID', HttpStatus.BAD_REQUEST);
  //   }

  //   const orderData = new OrderDto(data.age, data.birthDay, data.cardNumber, data.tourId, data.userId);
  //   return await this.orderService.sendOrder(orderData);
  // }
}
