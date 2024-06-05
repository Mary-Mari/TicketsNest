import { Injectable } from '@nestjs/common';
import { Order, OrderDocument } from '../../shemas/order';
import { OrderDto } from '../../dto/order-dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async sendOrder(data: OrderDto) {
    const orderData = new this.orderModel(data);
    return orderData.save();
  }

  getAll(userId: string) {
    return this.orderModel.find({ userId });
  }

  async create(orderDto: OrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(orderDto);
    return createdOrder.save();
  }
}
