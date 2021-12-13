import { CarsService } from '@/cars/cars.service';
import { Car } from '@/cars/car.model';
import { CreateCarDto } from '@/cars/create.car.dto';
import { GetCarsFilterDto } from '@/cars/get.cars.filter.dto';
import { UpdateCarInfosDto } from '@/cars/update.car.info.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Logger, Put } from '@nestjs/common';

@Controller('cars')
export class CarsController {
  private logger = new Logger('CarsController')
  constructor(private carsService: CarsService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    this.logger.verbose(`Registering a new car using ${createCarDto}`)
    return this.carsService.create(createCarDto)
  }

  @Get()
  getCars(@Query() filterDto?: GetCarsFilterDto): Promise<Car[]> {
    this.logger.verbose(`Applied filters ${JSON.stringify(filterDto)}`)
    return this.carsService.getCars(filterDto)
  }

  @Get('/:id')
  getCarById(@Param('id') id: string): Promise<Car> {
    this.logger.verbose(`Pass id = ${id}`)
    return this.carsService.getCarById(id)
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    this.logger.verbose(`Pass id = ${id}`)
    return this.carsService.delete(id)
  }

  @Put('/:id')
  restore(@Param('id') id: string): Promise<void> {
    this.logger.verbose(`Pass id = ${id}`)
    return this.carsService.restore(id)
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
