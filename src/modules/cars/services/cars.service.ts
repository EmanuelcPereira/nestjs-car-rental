
import { CreateCarDto } from '@/modules/cars/dtos/create.car.dto';
import { GetCarsFilterDto } from '@/modules/cars/dtos/get.cars.filter.dto';
import { UpdateCarInfosDto } from '@/modules/cars/dtos/update.car.info.dto';
import { CarsRepository } from '@/modules/cars/repositories/cars.repository';
import { Car } from '@/modules/cars/Entities/car.entity';
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


  inactivate(id: string): Promise<void> {
    return this.carsRepository.inactivateCar(id)
  }

  reactive(id: string): Promise<void> {
    return this.carsRepository.reactivateCar(id)
  }

  update(id: string, updateCarInfo: UpdateCarInfosDto): Promise<Car> {
    return this.carsRepository.updateCar(id, updateCarInfo)

  }
}
