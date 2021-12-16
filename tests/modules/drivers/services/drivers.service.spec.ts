import { Test } from '@nestjs/testing';
import { DriversService } from '@/modules/drivers/services/drivers.service';
import { DriversRepository } from '@/modules/drivers/repositories/drivers.repository';
import faker from 'faker';
import { UpdateDriverDto } from '@/modules/drivers/dto/update-driver.dto';


let driversService: DriversService;
let driversRepository

let id = faker.datatype.uuid()

const mockDriversRepository = () => ({
  getDrivers: jest.fn(),
  getDriverById: jest.fn(),
  createDriver: jest.fn(),
  updateDriver: jest.fn(),
  inactivateDriver: jest.fn(),
  reactivateDriver: jest.fn()
})

const mockDriver = () => ({
  id,
  name: faker.name.findName(),
  isDeleted: false
})

const mockDrivers = () => ([
  {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    isDeleted: false
  },
  {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    isDeleted: false
  }
])

describe('DriversService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DriversService,
        { provide: DriversRepository, useFactory: mockDriversRepository }
      ],
    }).compile();

    driversService = module.get<DriversService>(DriversService);
    driversRepository = module.get<DriversRepository>(DriversRepository);
  });

  describe('create', () => {
    it('ensure driversService create driver with correct values', async () => {
      const driver = mockDriver()
      driversRepository.createDriver.mockResolvedValue(driver)
      const result = await driversService.create({
        name: faker.name.findName()
      })
      expect(result).toEqual(driver)
    })
  })

  describe('getDrivers', () => {
    it('ensure driversService get all drivers from repository', async () => {
      const drivers = mockDrivers()
      driversRepository.getDrivers.mockResolvedValue(drivers)
      const name = faker.name.findName()
      const result = await driversService.getDrivers(name)
      expect(result).toEqual(drivers)
    })
  })

  describe('getDriversById', () => {
    it('ensure driversService get driver by id from repository', async () => {
      const driver = mockDriver()
      driversRepository.getDriverById.mockResolvedValue(driver)
      const result = await driversService.getDriverById(id)
      expect(result).toEqual(driver)
    })
  })

  describe('delete', () => {
    it('ensure driverService delete set isDeleted to true', async () => {
      const driver = mockDriver()
      driversRepository.inactivateDriver.mockResolvedValue({ affected: 1 })
      expect(driversRepository.inactivateDriver).not.toHaveBeenCalled()
      await driversService.inactivate(id)
      expect(driversRepository.inactivateDriver).toHaveBeenCalled()
    })
  })

  describe('restore', () => {
    it('ensure driversService restore se isDeleted fo false', async () => {
      driversRepository.reactivateDriver.mockResolvedValue({ affected: 1 })
      expect(driversRepository.reactivateDriver).not.toHaveBeenCalled()
      await driversService.reactivate(id)
      expect(driversRepository.reactivateDriver).toHaveBeenCalled()
    })
  })

  describe('update', () => {
    it('ensure driversService update driver name', async () => {
      const driver = mockDriver()
      driversRepository.updateDriver.mockResolvedValue(driver)
      const updateDriverInfo: UpdateDriverDto = {
        name: faker.name.findName()
      }
      const result = await driversService.update(driver.id, updateDriverInfo)
    })
  })
});