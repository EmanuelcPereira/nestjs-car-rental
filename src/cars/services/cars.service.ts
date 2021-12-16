
import { CreateCarDto } from '@/cars/dtos/create.car.dto';
import { GetCarsFilterDto } from '@/cars/dtos/get.cars.filter.dto';
import { UpdateCarInfosDto } from '@/cars/dtos/update.car.info.dto';
import { CarsRepository } from '@/cars/repositories/cars.repository';
import { Car } from '@/cars/Entities/car.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CarsService {
  constructor (
    @InjectRepository(CarsRepository)
    private carsRepository: CarsRepository
  ) { }

  create(createCarDto: CreateCarDto): Promise<Car> {
    return this.carsRepository.createCar(createCarDto)
  }
  
  getCars(filterDto?: GetCarsFilterDto): Promise<Car[]> {
    return this.carsRepository.getCars(filterDto)
  }

  getCarById(id: string): Promise<Car> {
    return this.carsRepository.getCarById(id)
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
