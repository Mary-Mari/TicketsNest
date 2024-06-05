import { Controller, UseInterceptors, UploadedFile, Post, Body, Get, Param} from '@nestjs/common';
import { ToursService } from '../../services/tours/tours.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { ITourClient } from 'src/interfaces/Tour';


@Controller('tour-item')
export class TourItemController {
  
    constructor(private toursService: ToursService) {}

    static imgName: string;

  @Post()
  @UseInterceptors(FileInterceptor('img', {
    storage: diskStorage({
      destination: './public/',
      filename: (req, file, cb) => {
        const imgType = file.mimetype.split('/')[1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

        const imgName = file.fieldname + '-' + uniqueSuffix+'.'+imgType[1];
        cb(null, imgName);
        TourItemController.imgName = imgName;
      }
    })
  }))
    async initTours(@Body() body: ITourClient, @UploadedFile() file: Express.Multer.File) {
        if (file) {
          body.img = file.filename;
        } else {
          return { success: false, message: 'File upload failed' };
        }  
}
}
