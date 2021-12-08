import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './car.model';
import { v4 as uuid } from 'uuid'
import { CreateCarDto } from './create.car.dto';
import { GetCarsFilterDto } from './get.cars.filter.dto';
import { UpdateCarInfosDto } from './update.car.info.dto';

@Injectable()
export class CarsService {
  cars: Car[] = [];

  getAllCars () {
    return this.cars;
  }

  getCarsWithFilters(filterDto: GetCarsFilterDto): Car[] {
    const { brand, color, licensePlate } = filterDto

    let cars = this.getAllCars()

    if (brand) {
      cars = cars.filter(car => car.brand === brand)
    }

    if (color) {
      cars = cars.filter(car => car.color === color)
    }

    if (licensePlate) {
      cars = cars.filter(car => car.licensePlate === licensePlate)
    }

    return cars
  }

  getCarById(id: string): Car {
    const foundCar = this.cars.find(car => car.id === id)

    if (!foundCar) {
      throw new NotFoundException(`Car with Id ${id} not found`)
    }

    return foundCar
  }

  createCar(createCarDto: CreateCarDto): Car {
    const { brand, color, licensePlate } = createCarDto
    const car: Car = {
      id: uuid(),
      brand,
      color,
      licensePlate,
      isDeleted: false
    }

    this.cars.push(car)

    return car
  }

  delete(id: string): void {
    const foundCar = this.getCarById(id)
    this.cars = this.cars.filter(car => car.id !== foundCar.id)
  }

  update(id: string, updateCarInfo: UpdateCarInfosDto): Car {
    const { brand, color } = updateCarInfo
    const car = this.getCarById(id)
    car.brand = brand
    car.color = color

    return car

  }
}
