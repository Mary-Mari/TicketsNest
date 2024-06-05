import { Controller, Get, Param, Post, Delete, UseGuards } from '@nestjs/common';
import { ToursService } from '../../services/tours/tours.service';
import { Tour } from '../../shemas/tour';
import { ITour } from 'src/interfaces/Tour';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Post()
  initTours(): Promise<ITour[]> {
    this.toursService.generateTours();
    return this.toursService.getAllTours();
  }
  
  @Get()
  async getAllTours(): Promise<Tour[]> {
    return this.toursService.getAllTours();
  }

  @Get(':id')
  async getTourById(@Param('id') id: string): Promise<Tour> {
    // Проверяем, имеет ли параметр 'id' правильный формат ObjectId
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      throw new Error('Invalid ObjectId format');
    }

    return this.toursService.getTourById(id);
  }

  @Delete()
  async deleteAllTours(): Promise<void> {
    await this.toursService.deleteTours();
  }
}
