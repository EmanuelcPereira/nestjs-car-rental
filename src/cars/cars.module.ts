import { CarsController } from '@/cars/cars.controller';
import { CarsService } from '@/cars/cars.service';
import { CarsRepository } from '@/cars/cars.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CarsRepository])],
  controllers: [CarsController],
  providers: [CarsService]
})
export class CarsModule { }
