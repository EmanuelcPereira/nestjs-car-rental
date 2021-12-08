import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Logger } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Car } from './car.model';
import { CreateCarDto } from './create.car.dto';
import { GetCarsFilterDto } from './get.cars.filter.dto';
import { UpdateCarInfosDto } from './update.car.info.dto';

@Controller('cars')
export class CarsController {
  private logger = new Logger('CarsController')
  constructor(private carsService: CarsService) {}

  @Get()
  getCars(@Query() filterDto: GetCarsFilterDto): Promise<Car[]> {
    this.logger.verbose(`Applied filters ${JSON.stringify(filterDto)}`)
    return this.carsService.getCars(filterDto)
  }

  @Get('/:id')
  getCarById(@Param('id') id: string): Promise<Car> {
    this.logger.verbose(`Pass id = ${id}`)
    return this.carsService.getCarById(id)
  }

  @Post()
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    this.logger.verbose(`Registering a new car using ${createCarDto}`)
    return this.carsService.create(createCarDto)
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    this.logger.verbose(`Pass id = ${id}`)
    return this.carsService.delete(id)
  }

  @Patch('/:id/characteristics')
  update(
    @Param('id') id: string,
    @Body() updateCarInfo: UpdateCarInfosDto
  ): Promise<Car> {
    this.logger.verbose(`Pass id = ${id} and infos ${updateCarInfo}`)
    return this.carsService.update(id, updateCarInfo)
  }
}
