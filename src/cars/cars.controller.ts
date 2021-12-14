import { CarsService } from '@/cars/cars.service';
import { CreateCarDto } from '@/cars/create.car.dto';
import { GetCarsFilterDto } from '@/cars/get.cars.filter.dto';
import { UpdateCarInfosDto } from '@/cars/update.car.info.dto';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Logger, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Car } from './car.entity';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  private logger = new Logger('CarsController')
  constructor (private carsService: CarsService) { }

  @Post()
  @ApiOperation({ summary: 'create car' })
  @ApiResponse({ status: 201, description: 'Car created' })
  create (@Body() createCarDto: CreateCarDto): Promise<Car> {
    this.logger.verbose(`Registering a new car using ${createCarDto}`)
    return this.carsService.create(createCarDto)
  }

  @Get()
  @ApiOperation({ summary: 'List all registered cars' })
  @ApiResponse({ status: 500, description: 'Failed to get cars using filters' })
  getCars (@Query() filterDto?: GetCarsFilterDto): Promise<Car[]> {
    this.logger.verbose(`Applied filters ${JSON.stringify(filterDto)}`)
    return this.carsService.getCars(filterDto)
  }

  @Get('/:id')
  @ApiOperation({ summary: 'List a car trough it\'s Id' })
  @ApiResponse({ status: 200, description: 'Found the car', type: Car })
  @ApiResponse({ status: 404, description: 'Car not found' })
  getCarById (@Param('id') id: string): Promise<Car> {
    this.logger.verbose(`Pass id = ${id}`)
    return this.carsService.getCarById(id)
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a registered car' })
  @ApiResponse({ status: 200, description: 'Car deleted' })
  @ApiResponse({ status: 400, description: 'Car already deleted' })
  @ApiResponse({ status: 404, description: 'Car not found' })
  delete (@Param('id') id: string): Promise<void> {
    this.logger.verbose(`Pass id = ${id}`)
    return this.carsService.delete(id)
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Restore a deleted car' })
  @ApiResponse({ status: 200, description: 'Car restored' })
  @ApiResponse({ status: 400, description: 'Car already restored' })
  @ApiResponse({ status: 404, description: 'Car not found' })
  restore (@Param('id') id: string): Promise<void> {
    this.logger.verbose(`Pass id = ${id}`)
    return this.carsService.restore(id)
  }

  @Patch('/:id/characteristics')
  @ApiOperation({ summary: 'Update car infos' })
  @ApiResponse({ status: 200, description: 'Car infos updated', type: Car })
  @ApiResponse({ status: 404, description: 'Car not found' })
  update (
    @Param('id') id: string,
    @Body() updateCarInfo: UpdateCarInfosDto
  ): Promise<Car> {
    this.logger.verbose(`Pass id = ${id} and infos ${updateCarInfo}`)
    return this.carsService.update(id, updateCarInfo)
  }
}
