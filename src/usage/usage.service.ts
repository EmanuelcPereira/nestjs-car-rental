import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsageDto } from './dto/create-usage.dto';
import { UpdateUsageDto } from './dto/update-usage.dto';
import { Usage } from './entities/usage.entity';
import { UsageRepository } from './usage.repository';

@Injectable()
export class UsageService {
  constructor (
    @InjectRepository(UsageRepository)
    private usageRepository: UsageRepository
  ) { }

  create (createUsageDto: CreateUsageDto): Promise<Usage> {
    return this.usageRepository.createUsage(createUsageDto);
  }

  getUsage (): Promise<Usage[]> {
    return this.usageRepository.getUsage();
  }

  getUsageById (id: string): Promise<Usage> {
    return this.usageRepository.getUsageById(id);
  }

  update (id: string, updateUsageDto: UpdateUsageDto): Promise<Usage> {
    return this.usageRepository.updateUsage(id, updateUsageDto);
  }

  delete (id: string): Promise<void> {
    return this.usageRepository.deleteUsage(id);
  }
}
