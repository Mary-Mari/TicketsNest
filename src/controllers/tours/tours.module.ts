import { Module } from '@nestjs/common';
import { ToursService } from '../../services/tours/tours.service';
import { ToursController } from './tours.controller';
import { TourSchema } from 'src/shemas/tour';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategyService } from 'src/services/authentication/jwt-strategy/jwt-strategy.service';
import { jwtConstants } from'src/static/private/constants';
import { Tour } from '../../shemas/tour'


@Module({
    controllers: [ToursController],
    imports: [ MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret
    })],
    providers: [ToursService, JwtStrategyService]
})


export class ToursModule {}
