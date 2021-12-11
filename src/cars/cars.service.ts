import { Car } from '@/cars/car.model';
import { CreateCarDto } from '@/cars/create.car.dto';
import { GetCarsFilterDto } from '@/cars/get.cars.filter.dto';
import { UpdateCarInfosDto } from '@/cars/update.car.info.dto';
import { CarsRepository } from '@/cars/cars.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CarsService {
  constructor (
    @InjectRepository(CarsRepository)
    private carsRepository: CarsRepository
  ) { }

  getCars(filterDto?: GetCarsFilterDto): Promise<Car[]> {
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

  restore(id: string): Promise<void> {
    return this.carsRepository.restoreCar(id)
  }

  update(id: string, updateCarInfo: UpdateCarInfosDto): Promise<Car> {
    return this.carsRepository.updateCar(id, updateCarInfo)

  }
}
