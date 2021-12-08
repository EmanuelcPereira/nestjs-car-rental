import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './car.model';
import { CreateCarDto } from './create.car.dto';
import { GetCarsFilterDto } from './get.cars.filter.dto';
import { UpdateCarInfosDto } from './update.car.info.dto';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getCars(@Query() filterDto: GetCarsFilterDto): Car[] {
    if (Object.keys(filterDto).length) {
      return this.carsService.getCarsWithFilters(filterDto)
    } else {
      return this.carsService.getAllCars()
    }
  }

  @Get('/:id')
  getCarById(@Param('id') id: string): Car {
    return this.carsService.getCarById(id)
  }

  @Post()
  createCar(@Body() createCarDto: CreateCarDto): Car {
    return this.carsService.createCar(createCarDto)
  }

  @Delete('/:id')
  delete(@Param('id') id: string): void {
    return this.carsService.delete(id)
  }

  @Patch('/:id/characteristics')
  update(
    @Param('id') id: string,
    @Body() updateCarInfo: UpdateCarInfosDto
  ): Car {
    return this.carsService.update(id, updateCarInfo)
  }
}
