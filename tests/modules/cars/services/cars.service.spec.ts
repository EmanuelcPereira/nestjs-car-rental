import { CarsService } from '@/modules/cars/services/cars.service';
import { CarsRepository } from '@/modules/cars/repositories/cars.repository';
import { Car } from '@/modules/cars/Entities/car.entity';
import { Test } from '@nestjs/testing';
import faker from 'faker';

let carsService: CarsService;
let carsRepository: CarsRepository;

let id = faker.datatype.uuid()

const allCars: Car[] = [
  new Car({
    id,
    brand: faker.random.word(),
    color: faker.random.word(),
    licensePlate: faker.random.word(),
    isDeleted: false
  }),
  new Car({
    id: faker.datatype.uuid(),
    brand: faker.random.word(),
    color: faker.random.word(),
    licensePlate: faker.random.word(),
    isDeleted: false
  })]

const newCar = new Car({
  id,
  brand: 'Ford',
  licensePlate: 'ABC-1234',
  color: 'Green',
  isDeleted: false,
})

const updateCar = new Car({
  id,
  brand: 'Alfa Romeo',
  licensePlate: 'DEF-5678',
  color: 'Burro fugido',
  isDeleted: false,
})


describe('CarsService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CarsService,
        {
          provide: CarsRepository,
          useValue: {
            getCars: jest.fn().mockResolvedValue(allCars),
            getCarById: jest.fn().mockResolvedValue(allCars[0]),
            createCar: jest.fn().mockResolvedValue(newCar),
            updateCar: jest.fn().mockResolvedValue(updateCar),
            inactivateCar: jest.fn().mockResolvedValue({ affected: 1 }),
            reactivateCar: jest.fn().mockResolvedValue({ affected: 1 })
          }
        }
      ]
    }).compile()
    carsService = module.get<CarsService>(CarsService)
    carsRepository = module.get<CarsRepository>(CarsRepository)
  })

  it('should be defined', () => {
    expect(carsRepository).toBeDefined()
    expect(carsService).toBeDefined()
  })
})