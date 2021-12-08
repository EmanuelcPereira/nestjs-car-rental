import { NotFoundException, Logger, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from "typeorm";
import { Car } from './car.entity';
import { CreateCarDto } from "./create.car.dto";
import { UpdateCarInfosDto } from "./update.car.info.dto";
import { GetCarsFilterDto } from './get.cars.filter.dto';

@EntityRepository(Car)
export class CarsRepository extends Repository<Car> {
  private logger = new Logger('CarsRepository')

  async getCars(filterDto: GetCarsFilterDto): Promise<Car[]> {
    const { brand, color, licensePlate } = filterDto

    const query = this.createQueryBuilder('car')

    if (brand) {
      query.andWhere('LOWER(car.brand) LIKE LOWER(:brand)', { brand: `%${brand}%` })
    }

    if (color) {
      query.andWhere('LOWER(car.color) = LOWER(:color)', { color })
    }

    if (licensePlate) {
      query.andWhere('LOWER(car.licensePlate) LIKE LOWER(:licensePlate)', { licensePlate: `%${licensePlate}%` })
    }

    try {
      const cars = await query.getMany()
      return cars
    } catch (error) {
      this.logger.error(`Failed to get cars using filters ${JSON.stringify(filterDto)}`, error.stack)
      throw new InternalServerErrorException()
    }

  }

  async getCarById(id: string): Promise<Car> {
    const car = await this.findOne(id)

    if (!car) {
      throw new NotFoundException(`Car with Id ${id} not found`)
    }

    return car
  }

  async createCar(createCarDto: CreateCarDto): Promise<Car> {
    const { brand, color, licensePlate } = createCarDto
    const car = this.create({
      brand,
      color,
      licensePlate,
      isDeleted: false
    })

    await this.save(car)

    return car
  }

  async updateCar(id: string, updateCarInfo: UpdateCarInfosDto): Promise<Car> {
    const { brand, color } = updateCarInfo
    const car = await this.getCarById(id)
    car.brand = brand
    car.color = color

    await this.save(car)

    return car

  }

  async deleteCar(id: string): Promise<void> {
    const result = await this.delete(id)

    if (result.affected === 0) {
      throw new NotFoundException(`Car with Id ${id} not found`)
    }
  }
}