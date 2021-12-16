import { CarsService } from '@/modules/cars/services/cars.service';
import { CarsRepository } from '@/modules/cars/repositories/cars.repository';
import { GetCarsFilterDto } from '@/modules/cars/dtos/get.cars.filter.dto';
import { Test } from '@nestjs/testing';
import faker from 'faker';

let carsService: CarsService
let carsRepository

let id = faker.datatype.uuid()

const mockCarsRepository = () => ({
  getCars: jest.fn(),
  getCarById: jest.fn(),
  createCar: jest.fn(),
  updateCar: jest.fn(),
  inactivateCar: jest.fn(),
  reactivateCar: jest.fn()
})

const mockCars = () => ([{
  id: faker.datatype.uuid(),
  brand: faker.random.word(),
  color: faker.random.word(),
  licensePlate: faker.random.word(),
  isDeleted: false
},
{
  id: faker.datatype.uuid(),
  brand: faker.random.word(),
  color: faker.random.word(),
  licensePlate: faker.random.word(),
  isDeleted: false
}])

const mockCar = () => ({
  id,
  brand: faker.random.word(),
  color: faker.random.word(),
  licensePlate: faker.random.word(),
  isDeleted: false
})

describe('CarsService', () => {
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CarsService,
        { provide: CarsRepository, useFactory: mockCarsRepository }
      ]
    }).compile()
    carsService = module.get<CarsService>(CarsService)
    carsRepository = module.get<CarsRepository>(CarsRepository)
  })

  describe('getCars', () => {
    it('ensure carsService get all cars from repository', async () => {
      const cars = mockCars()
      carsRepository.getCars.mockResolvedValue(cars)
      const filter: GetCarsFilterDto = {}
      const result = await carsService.getCars(filter)
      expect(result).toEqual(cars)
    })
  })

  describe('getCarById', () => {
    it('ensure carsService get car by Id from repository', async () => {
      const car = mockCar()
      carsRepository.getCarById.mockResolvedValue(car)
      const result = await carsService.getCarById(id)
      expect(result).toEqual(car)
    })
  })

  describe('create', () => {
    it('ensure carsService create car with correct values', async () => {
      const car = mockCar()
      carsRepository.createCar.mockResolvedValue(car)
      const result = await carsService.create({
        brand: faker.random.word(),
        color: faker.random.word(),
        licensePlate: faker.random.word()
      })
      expect(result).toEqual(car)
    })
  })

  describe('inactivate', () => {
    it('ensure carsService inactivate set isDeleted to true', async () => {
      carsRepository.inactivateCar.mockResolvedValue({ affected: 1 })
      expect(carsRepository.inactivateCar).not.toHaveBeenCalled()
      await carsService.inactivate(id)
      expect(carsRepository.inactivateCar).toHaveBeenCalled()
    })
  })

  describe('restore', () => {
    it('ensure carsService restore set isDeleted to false', async () => {
      carsRepository.reactivateCar.mockResolvedValue({ affected: 1 })
      expect(carsRepository.reactivateCar).not.toHaveBeenCalled()
      await carsService.reactive(id)
      expect(carsRepository.reactivateCar).toHaveBeenCalled()
    })
  })
})