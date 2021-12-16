import { UsageService } from '@/usage/services/usage.service';
import { UsageRepository } from '@/usage/repositories/usage.repository';
import { Test, TestingModule } from '@nestjs/testing';
import faker from 'faker';

let usageService: UsageService;
let usageRepository;

let id = faker.datatype.uuid()

const mockUsageRepository = () => ({
  createUsage: jest.fn(),
  getUsage: jest.fn(),
  getUsageById: jest.fn(),
  deleteUsage: jest.fn(),
  updateUsage: jest.fn(),
})

const mockUsage = () => ({
  id,
  driverId: faker.datatype.uuid(),
  carId: faker.datatype.uuid(),
  motivation: faker.random.words(),
  initialUsage: faker.date.recent(),
  finalUsage: null,
})

const mockUsages = () => ([
  {
    id: faker.datatype.uuid(),
    driverId: faker.datatype.uuid(),
    carId: faker.datatype.uuid(),
    motivation: faker.random.words(),
    initialUsage: faker.date.recent(),
    finalUsage: null,
  },
  {
    id: faker.datatype.uuid(),
    driverId: faker.datatype.uuid(),
    carId: faker.datatype.uuid(),
    motivation: faker.random.words(),
    initialUsage: faker.date.recent(),
    finalUsage: null,
  }
])

describe('UsageService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsageService,
        { provide: UsageRepository, useFactory: mockUsageRepository }
      ],
    }).compile();

    usageService = module.get<UsageService>(UsageService);
    usageRepository = module.get<UsageRepository>(UsageRepository);
  });

  it('should be defined', () => {
    expect(usageService).toBeDefined();
  });

  describe('create', () => {
    it('ensure usageService create a usage with correct values', async () => {
      const usage = mockUsage()
      usageRepository.createUsage.mockResolvedValue(usage)
      const result = await usageService.create({
        driverId: faker.datatype.uuid(),
        carId: faker.datatype.uuid(),
        motivation: faker.random.words()
      })
      expect(result).toEqual(usage)
    })
  })

  describe('getUsage', () => {
    it('ensure usageService get all usage with correct values', async () => {
      const usage = mockUsages()
      usageRepository.getUsage.mockResolvedValue(usage)
      const result = await usageService.getUsage()
      expect(result.length).toBe(2)
      expect(result).toEqual(usage)

    })
  })

  describe('getUsageById', () => {
    it('ensure usageService get an usage by its id', async () => {
      const usage = mockUsage()
      usageRepository.getUsageById.mockResolvedValue(usage)
      const result = await usageService.getUsageById(id)
      expect(result).toEqual(usage)
    })
  })

  describe('deleteUsage', () => {
    it('ensure usageService delete set a final usage for a rental', async () => {
      const usage = mockUsage()
      usageRepository.deleteUsage.mockResolvedValue({ affected: 1 })
      expect(usageRepository.deleteUsage).not.toHaveBeenCalled()
      await usageService.delete(usage.id)
      expect(usageRepository.deleteUsage).toHaveBeenCalledWith(usage.id)
    })
  })
});
