import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { DriversRepository } from './drivers.repository';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(DriversRepository)
    private driversRepository: DriversRepository
  ) {}

  create(createDriverDto: CreateDriverDto) {
    return this.driversRepository.createDriver(createDriverDto)
  }

  findAll(name?: string) {
    return this.driversRepository.getDrivers(name);
  }

  findOne(id: string) {
    return this.driversRepository.getDriverById(id);
  }

  update(id: string, updateDriverDto: UpdateDriverDto) {
    return this.driversRepository.updateDriver(id, updateDriverDto);
  }

  delete(id: string) {
    return this.driversRepository.deleteDriver(id);
  }

  restore(id: string) {
    return this.driversRepository.restoreDriver(id);
  }
}
