import { Injectable } from '@nestjs/common';
import { Car } from './car.model';
import { CreateCarDto } from './create.car.dto';
import { GetCarsFilterDto } from './get.cars.filter.dto';
import { UpdateCarInfosDto } from './update.car.info.dto';
import { CarsRepository } from './cars.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CarsService {
  constructor (
    @InjectRepository(CarsRepository)
    private carsRepository: CarsRepository
  ) { }

  getCars(filterDto: GetCarsFilterDto): Promise<Car[]> {
    return this.carsRepository.getCars(filterDto)
  }

  getCarById(id: string): Promise<Car> {
    return this.carsRepository.getCarById(id)
  }

  create(createCarDto: CreateCarDto): Promise<Car> {
    return this.carsRepository.createCar(createCarDto)
  }

  delete(id: string): Promise<void> {
    return this.carsRepository.deleteCar(id)
  }

  update(id: string, updateCarInfo: UpdateCarInfosDto): Promise<Car> {
    return this.carsRepository.updateCar(id, updateCarInfo)

  }
}
