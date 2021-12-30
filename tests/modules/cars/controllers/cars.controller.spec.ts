import { CarsController } from '@/modules/cars/controllers/cars.controller';
import { CarsService } from '@/modules/cars/services/cars.service';
import { CreateCarDto } from '@/modules/cars/dtos/create.car.dto';
import { Car } from '@/modules/cars/Entities/car.entity';
import { BadRequestException } from '@nestjs/common';
import { UpdateCarInfosDto } from '@/modules/cars/dtos/update.car.info.dto';
import faker from 'faker';
import { Test, TestingModule } from '@nestjs/testing';

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

describe('CarsController', () => {
  let carsController: CarsController
  let carsService: CarsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [
        {
          provide: CarsService,
          useValue: {
            getCars: jest.fn().mockResolvedValue(allCars),
            create: jest.fn().mockResolvedValue(newCar),
            getCarById: jest.fn().mockResolvedValue(allCars[0]),
            update: jest.fn().mockResolvedValue(updateCar),
            inactivate: jest.fn().mockResolvedValue({ affected: 1 }),
            reactive: jest.fn().mockResolvedValue({ affected: 1 }),
          }
        }
      ]
    }).compile()

    carsController = module.get<CarsController>(CarsController)
    carsService = module.get<CarsService>(CarsService)
  })

  it('should be defined', () => {
    expect(carsController).toBeDefined()
    expect(carsService).toBeDefined()
  })

  describe('create', () => {
    it('ensure create a car with correct values', async () => {
      const body: CreateCarDto = {
        brand: 'Ford',
        licensePlate: 'ABC-1234',
        color: 'Green',
      }

      const result = await carsController.create(body);
      expect(result).toEqual(newCar)
      expect(carsService.create).toHaveBeenCalledTimes(1)
      expect(carsService.create).toHaveBeenCalledWith(body)
    })
  })

  describe('getCars', () => {
    it('ensure carsController get all cars', async () => {
      const result = await carsController.getCars()

      expect(result).toEqual(allCars)
      expect(typeof result).toEqual('object')
      expect(carsService.getCars).toHaveBeenCalledTimes(1)
    })
  })

  describe('getCarByID', () => {
    it('ensure carsController get car by Id', async () => {
      const result = await carsController.getCarById(id)

      expect(result).toEqual(allCars[0])
      expect(carsService.getCarById).toHaveBeenCalledTimes(1)
      expect(carsService.getCarById).toHaveBeenCalledWith(id)
    })

    it('ensure carsController get car By Id throw', async () => {
      jest.spyOn(carsService, 'getCarById').mockRejectedValueOnce(new BadRequestException())

      expect(carsController.getCarById(id)).rejects.toThrowError()
    })
  })

  describe('update', () => {
    it('ensure update car with correct values', async () => {
      const body: UpdateCarInfosDto = {
        brand: 'Alfa Romeo',
        color: 'Burro fugido',
      }

      const result = await carsController.update(id, body)

      expect(result).toEqual(updateCar)
      expect(carsService.update).toHaveBeenCalledTimes(1)
      expect(carsService.update).toHaveBeenCalledWith(id, body)
    })

    it('ensure update car throw', async () => {
      const body: UpdateCarInfosDto = {
        brand: 'Alfa Romeo',
        color: 'Burro fugido',
      }

      jest.spyOn(carsService, 'update').mockRejectedValueOnce(new BadRequestException())

      expect(carsController.update(id, body)).rejects.toThrowError()
    })
  })

  describe('delete', () => {
    it('ensure CarsController delete successful', async () => {
      const result = await carsController.delete(id)

      expect(result).toEqual({ affected: 1 })
    })

    it('ensure carsController delete trhow', async () => {
      jest.spyOn(carsService, 'inactivate').mockRejectedValueOnce(new BadRequestException())

      expect(carsController.delete(id)).rejects.toThrowError()
    })
  })

  describe('restore', () => {
    it('ensure carsController restore successful', async () => {
      const result = await carsController.restore(id)

      expect(result).toEqual({ affected: 1 })
    })

    it('ensure carsController restore trhow', async () => {
      jest.spyOn(carsService, 'reactive').mockRejectedValueOnce(new BadRequestException())

      expect(carsController.restore(id)).rejects.toThrowError()
    })
  })
})