import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsRepository } from './cars.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CarsRepository])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
