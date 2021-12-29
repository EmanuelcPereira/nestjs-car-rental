import { UsageService } from '@/modules/usage/services/usage.service';
import { UsageRepository } from '@/modules/usage/repositories/usage.repository';
import { Usage } from '@/modules/usage/entities/usage.entity';
import { Test, TestingModule } from '@nestjs/testing';
import faker from 'faker';

let usageService: UsageService;
let usageRepository: UsageRepository;

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

describe('UsageService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsageService,
        {
          provide: UsageRepository,
          useValue: {
            createUsage: jest.fn().mockResolvedValue(newUsage),
            getUsage: jest.fn().mockResolvedValue(allUsage),
            getUsageById: jest.fn().mockResolvedValue(allUsage[0]),
            deleteUsage: jest.fn().mockResolvedValue({ affected: 1 }),
            updateUsage: jest.fn().mockResolvedValue(updateUsage),
          }
        }
      ],
    }).compile();

    usageService = module.get<UsageService>(UsageService);
    usageRepository = module.get<UsageRepository>(UsageRepository);
  });

  it('should be defined', () => {
    expect(usageService).toBeDefined();
    expect(usageRepository).toBeDefined();
  });
});
