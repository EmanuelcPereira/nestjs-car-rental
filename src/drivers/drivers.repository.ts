import { EntityRepository, Repository } from 'typeorm';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';
import { Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';

@EntityRepository(Driver)
export class DriversRepository extends Repository<Driver> {
  private logger = new Logger('DriversRepository')

  async createDriver ({ name }: CreateDriverDto): Promise<Driver> {
    const driver = this.create({ name, isDeleted: false })

    await this.save(driver)

    return driver
  }

  async getDrivers (name?: string): Promise<Driver[]> {
    const query = this.createQueryBuilder('driver')
      .where('driver.isDeleted = :isDeleted', { isDeleted: false })

    if (name) {
      query.andWhere('LOWER(driver.name) LIKE LOWER(:name)', { name: `%${name}%` })
    }

    try {
      const drivers = await query.getMany()
      return drivers
    } catch (error) {
      this.logger.error(`Failed to get drivers using filters ${JSON.stringify(name)}`, error.stack)
      throw new InternalServerErrorException()
    }

  }

  async getDriverById (id: string): Promise<Driver> {
    const driver = await this.findOne(id)

    if (!driver) {
      throw new NotFoundException(`Driver with Id ${id} not found`)
    }

    return driver
  }

  async updateDriver (id: string, { name }: UpdateDriverDto): Promise<Driver> {
    const driver = await this.getDriverById(id)

    driver.name = name

    await this.save(driver)

    return driver
  }

  async deleteDriver (id: string): Promise<void> {
    const driver = await this.getDriverById(id)

    driver.isDeleted = true

    await this.save(driver)
  }

  async restoreDriver (id: string): Promise<void> {
    const driver = await this.getDriverById(id)

    driver.isDeleted = false
    
    await this.save(driver)
  }

}