import { CreateUsageDto } from '@/usage/dto/create-usage.dto';
import { UpdateUsageDto } from '@/usage/dto/update-usage.dto';
import { Usage } from '@/usage/entities/usage.entity';
import { UsageRepository } from '@/usage/repositories/usage.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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
