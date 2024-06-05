import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema, Order } from'src/shemas/order';
import { OrderService } from 'src/services/order/order.service';


@Module({
  controllers: [OrderController],
  imports: [MongooseModule.forFeature([
    { name: Order.name, schema: OrderSchema }])],
    
  providers: [OrderService]

})
export class OrderModule {}
