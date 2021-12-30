import { DriversController } from '@/modules/drivers/controllers/drivers.controller';
import { DriversService } from '@/modules/drivers/services/drivers.service';
import { Driver } from '@/modules/drivers/entities/driver.entity';
import { CreateDriverDto } from '@/modules/drivers/dto/create-driver.dto';
import { UpdateDriverDto } from '@/modules/drivers/dto/update-driver.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import faker from 'faker'

let id = faker.datatype.uuid()

const allDrivers: Driver[] = [
  new Driver({
    id,
    name: faker.name.findName(),
    isDeleted: false
  }),
  new Driver({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    isDeleted: false
  })]

const newDriver = new Driver({
  id,
  name: faker.name.findName(),
  isDeleted: false,
})

const updateDriver = new Driver({
  id,
  name: faker.name.findName(),
  isDeleted: false,
})

describe('DriversController', () => {
  let driversController: DriversController
  let driversService: DriversService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriversController,
        {
          provide: DriversService,
          useValue: {
            getDrivers: jest.fn().mockResolvedValue(allDrivers),
            getDriverById: jest.fn().mockResolvedValue(allDrivers[0]),
            create: jest.fn().mockResolvedValue(newDriver),
            update: jest.fn().mockResolvedValue(updateDriver),
            inactivate: jest.fn().mockResolvedValue({ affected: 1 }),
            reactivate: jest.fn().mockResolvedValue({ affected: 1 })
          }
        }
      ],
    }).compile();

    driversController = module.get<DriversController>(DriversController);
    driversService = module.get<DriversService>(DriversService);
  });

  it('should be defined', () => {
    expect(driversController).toBeDefined()
    expect(driversService).toBeDefined()
  })

  describe('create', () => {
    it('ensure create driver with correct values', async () => {
      const body: CreateDriverDto = {
        name: 'John Doe'
      }

      const result = await driversController.create(body);

      expect(result).toEqual(newDriver)
      expect(driversService.create).toHaveBeenCalledTimes(1)
      expect(driversService.create).toHaveBeenCalledWith(body)
    })
  })

  describe('getDrivers', () => {
    it('ensure driversController get all drivers', async () => {
      const result = await driversController.getDrivers()

      expect(result).toEqual(allDrivers)
      expect(typeof result).toEqual('object')
      expect(driversService.getDrivers).toHaveBeenCalledTimes(1)
    })
  })

  describe('getDriversById', () => {
    it('ensure driversController get driver by Id', async () => {
      const result =  await driversController.getDriverById(id)

      expect(result).toEqual(allDrivers[0])
      expect(driversService.getDriverById).toHaveBeenCalledTimes(1)
      expect(driversService.getDriverById).toHaveBeenCalledWith(id)    
    })

    it('ensure driversController getDriverById throw if invalid id was passed', async () => {
      jest.spyOn(driversService, 'getDriverById').mockRejectedValueOnce(new BadRequestException())

      expect(driversController.getDriverById('invalid')).rejects.toThrowError()
    })
  })

  describe('update', () => {
    it('ensure update driver with correct values', async () => {
      const body: UpdateDriverDto = {
        name: 'Fulano Sorte'
      }

      const result = await driversController.update(id, body)

      expect(result).toEqual(updateDriver)
      expect(driversService.update).toHaveBeenCalledTimes(1)
      expect(driversService.update).toHaveBeenCalledWith(id, body)
    })

    it('ensure update driver throw if wrong data was passed', async () => {
      const body: UpdateDriverDto = {
        name: 'Fulano Sorte'
      }

      jest.spyOn(driversService, 'update').mockRejectedValueOnce(new BadRequestException())

      expect(driversController.update('invalid_id', body)).rejects.toThrowError()

    })
  })

  describe('delete', () => {
    it('ensure DriversController delete successful', async () => {
      const result = await driversController.delete(id)

      expect(result).toEqual({ affected: 1 })
    })

    it('ensure driversController delete throw if wrong id was passed', async () => {
      jest.spyOn(driversService, 'inactivate').mockRejectedValueOnce(new BadRequestException())

      expect(driversController.delete('invalid_id')).rejects.toThrowError()
    })
  })

  describe('restore', () => {
    it('ensure DriversController restore successful', async () => {
      const result = await driversController.restore(id)

      expect(result).toEqual({ affected: 1 })
    })

    it('ensure driversController restore throw if wrong id was passed', async () => {
      jest.spyOn(driversService, 'reactivate').mockRejectedValueOnce(new BadRequestException())

      expect(driversController.restore('invalid_id')).rejects.toThrowError()
    })
  })
})