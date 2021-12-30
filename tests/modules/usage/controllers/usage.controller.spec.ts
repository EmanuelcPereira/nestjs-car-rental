import { UsageController } from '@/modules/usage/controllers/usage.controller';
import { UsageService } from '@/modules/usage/services/usage.service';
import { Usage } from '@/modules/usage/entities/usage.entity';
import { Test, TestingModule } from '@nestjs/testing';
import faker from 'faker'
import { CreateUsageDto } from '../../../../src/modules/usage/dto/create-usage.dto';
import { BadRequestException } from '@nestjs/common';
import { UpdateUsageDto } from '../../../../src/modules/usage/dto/update-usage.dto';

let id = faker.datatype.uuid()

const newUsage = new Usage({
  id,
  driverId: faker.datatype.uuid(),
  carId: faker.datatype.uuid(),
  motivation: faker.random.words(),
  initialUsage: faker.date.recent(),
  finalUsage: null,
})

const allUsage: Usage[] = [
  new Usage({
    id: faker.datatype.uuid(),
    driverId: faker.datatype.uuid(),
    carId: faker.datatype.uuid(),
    motivation: faker.random.words(),
    initialUsage: faker.date.recent(),
    finalUsage: null,
  }),
  new Usage({
    id: faker.datatype.uuid(),
    driverId: faker.datatype.uuid(),
    carId: faker.datatype.uuid(),
    motivation: faker.random.words(),
    initialUsage: faker.date.recent(),
    finalUsage: null,
  })
]

const updateUsage = new Usage({
  id,
  driverId: faker.datatype.uuid(),
  carId: faker.datatype.uuid(),
  motivation: faker.random.words(),
  initialUsage: faker.date.recent(),
  finalUsage: null,
})

describe('DriversController', () => {
  let usageController: UsageController
  let usageService: UsageService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsageController,
        {
          provide: UsageService,
          useValue: {
            create: jest.fn().mockResolvedValue(newUsage),
            getUsage: jest.fn().mockResolvedValue(allUsage),
            getUsageById: jest.fn().mockResolvedValue(allUsage[0]),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
            update: jest.fn().mockResolvedValue(updateUsage),
          }
        }
      ],
    }).compile();

    usageController = module.get<UsageController>(UsageController);
    usageService = module.get<UsageService>(UsageService);
  });

  it('should be defined', () => {
    expect(usageController).toBeDefined()
    expect(usageService).toBeDefined()
  })

  describe('create', () => {
    it('ensure create usage with correct values', async () => {
      const body: CreateUsageDto = {
        driverId: faker.datatype.uuid(),
        carId: faker.datatype.uuid(),
        motivation: faker.random.words()
      }

      const result = await usageController.create(body)

      expect(result).toEqual(newUsage)
      expect(usageService.create).toHaveBeenCalledTimes(1)
      expect(usageService.create).toHaveBeenCalledWith(body)
    })
  })

  describe('findAll', () => {
    it('ensure usageController find all usages', async () => {
      const result = await usageController.findAll()

      expect(result).toEqual(allUsage)
      expect(typeof result).toEqual('object')
      expect(usageService.getUsage).toHaveBeenCalledTimes(1)
    })
  })

  describe('findOne', () => {
    it('ensure usageController find one usage by id', async () => {
      const result = await usageController.findOne(id)

      expect(result).toEqual(allUsage[0])
      expect(usageService.getUsageById).toHaveBeenCalledTimes(1)
      expect(usageService.getUsageById).toHaveBeenCalledWith(id)
    })

    it('ensure usageController throw if wrong id is passed', () => {
      jest.spyOn(usageService, 'getUsageById').mockRejectedValueOnce(new BadRequestException())

      expect(usageController.findOne('invalid_id')).rejects.toThrowError()
    })
  })

  describe('update', () => {
    it('ensure update usage with correct values', async () => {
      const body: UpdateUsageDto = {
        driverId: faker.datatype.uuid(),
        carId: faker.datatype.uuid(),
        motivation: faker.random.words()
      }

      const result = await usageController.update(id, body)

      expect(result).toEqual(updateUsage)
      expect(usageService.update).toHaveBeenCalledTimes(1)
      expect(usageService.update).toHaveBeenCalledWith(id, body)
    })

    it('ensure update usage throw if wrong id is passed', async () => {
      const body: UpdateUsageDto = {
        driverId: faker.datatype.uuid(),
        carId: faker.datatype.uuid(),
        motivation: faker.random.words()
      }

      jest.spyOn(usageService, 'update').mockRejectedValueOnce(new BadRequestException())

      expect(usageController.update('invalid_id', body)).rejects.toThrowError()
    })
  })

  describe('delete', () => {
    it('ensure delete usage successful', async () => {
      const result = await usageController.remove(id)

      expect(result).toEqual({ affected: 1 })
      expect(usageService.delete).toHaveBeenCalledWith(id)
    })

    it('ensure delete throw if wrong id is passed', async () => {
      jest.spyOn(usageService, 'update').mockRejectedValueOnce(new BadRequestException())

      expect(usageController.remove('invalid_id')).rejects.toThrowError()
    })
  })
})