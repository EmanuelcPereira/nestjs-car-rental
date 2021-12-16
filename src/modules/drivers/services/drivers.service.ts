import { CreateDriverDto } from '@/modules/drivers/dto/create-driver.dto';
import { UpdateDriverDto } from '@/modules/drivers/dto/update-driver.dto';
import { DriversRepository } from '@/modules/drivers/repositories/drivers.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(DriversRepository)
    private driversRepository: DriversRepository
  ) {}

  create(createDriverDto: CreateDriverDto) {
    return this.driversRepository.createDriver(createDriverDto)
  }

  getDrivers(name?: string) {
    return this.driversRepository.getDrivers(name);
  }

  getDriverById(id: string) {
    return this.driversRepository.getDriverById(id);
  }

  update(id: string, updateDriverDto: UpdateDriverDto) {
    return this.driversRepository.updateDriver(id, updateDriverDto);
  }

  inactivate(id: string) {
    return this.driversRepository.inactivateDriver(id);
  }

  reactivate(id: string) {
    return this.driversRepository.reactivateDriver(id);
  }
}
