import { CarsController } from '@/modules/cars/controllers/cars.controller';
import { CarsService } from '@/modules/cars/services/cars.service';
import { CarsRepository } from '@/modules/cars/repositories/cars.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CarsRepository])],
  controllers: [CarsController],
  providers: [CarsService]
})
export class CarsModule { }
