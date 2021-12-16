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
  deleteCar: jest.fn(),
  restoreCar: jest.fn()
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

  describe('delete', () => {
    it('ensure carsService delete set isDeleted to true', async () => {
      carsRepository.deleteCar.mockResolvedValue({ affected: 1 })
      expect(carsRepository.deleteCar).not.toHaveBeenCalled()
      await carsService.delete(id)
      expect(carsRepository.deleteCar).toHaveBeenCalled()
    })
  })

  describe('restore', () => {
    it('ensure carsService restore set isDeleted to false', async () => {
      carsRepository.restoreCar.mockResolvedValue({ affected: 1 })
      expect(carsRepository.restoreCar).not.toHaveBeenCalled()
      await carsService.restore(id)
      expect(carsRepository.restoreCar).toHaveBeenCalled()
    })
  })
})