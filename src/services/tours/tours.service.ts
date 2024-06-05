import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tour, TourDocument } from '../../shemas/tour';
import { TourDto } from 'src/dto/tour-dto';
import { ITour, ITourClient } from 'src/interfaces/Tour';

@Injectable()
export class ToursService {
    private toursCount = 9;

    constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {}

    getAllTours() {
        return this.tourModel.find();
      }
    
       async getTourById(id): Promise <ITour> {
        return this.tourModel.findById(id);
      }
    
      async generateTours(): Promise<any> {
        for (let i=1; i<= this.toursCount; i++) {
              const tour = new TourDto(
                'test' + i,
                'test desc',
                'test operator',
                '1234',
                'pic' + i + '.jpg',
                'id' + i,
                'test type',
            
              );
              const tourData = new this.tourModel(tour);
              await tourData.save();
        }
      }
    
      async deleteTours(): Promise<any> {
        return this.tourModel.deleteMany({});
      }
    
      createTour(data) {
        const tour = new TourDto(
          data.name,
          data.description,
          data.operator,
          data.price,
          data.img,
          '',
          '',
        );
        const orderData = new this.tourModel(tour);
        return orderData.save();
      }
    
      getByName(name: string) {
        return this.tourModel.find({ name: { $regex: name, $options: 'i' } });
      }

      async uploadTour(body: ITourClient) {
        const tour = new TourDto(
          body.name,
          body.description,
          body.tourOperator,
          body.price,
          body.img,
          '',
          '',
        );
        const tourData = new this.tourModel(tour);
        await tourData.save();
      }

}
