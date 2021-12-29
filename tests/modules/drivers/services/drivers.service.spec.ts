import { DriversService } from '@/modules/drivers/services/drivers.service';
import { DriversRepository } from '@/modules/drivers/repositories/drivers.repository';
import { Driver } from '@/modules/drivers/entities/driver.entity';
import { Test } from '@nestjs/testing';
import faker from 'faker';

let driversService: DriversService;
let driversRepository: DriversRepository;

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

describe('DriversService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DriversService,
        {
          provide: DriversRepository,
          useValue: {
            getDrivers: jest.fn().mockResolvedValue(allDrivers),
            getDriverById: jest.fn().mockResolvedValue(allDrivers[0]),
            createDriver: jest.fn().mockResolvedValue(newDriver),
            updateDriver: jest.fn().mockResolvedValue(updateDriver),
            inactivateDriver: jest.fn().mockResolvedValue({ affected: 1 }),
            reactivateDriver: jest.fn().mockResolvedValue({ affected: 1 })
          }
        }
      ],
    }).compile();

    driversService = module.get<DriversService>(DriversService);
    driversRepository = module.get<DriversRepository>(DriversRepository);
  });

  it('should be defined', () => {
    expect(driversRepository).toBeDefined()
    expect(driversService).toBeDefined()
  })
});
