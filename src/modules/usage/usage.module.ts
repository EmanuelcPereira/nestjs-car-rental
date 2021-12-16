import { UsageService } from '@/modules/usage/services/usage.service';
import { UsageController } from '@/modules/usage/controllers/usage.controller';
import { UsageRepository } from '@/modules/usage/repositories/usage.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsageRepository])],
  controllers: [UsageController],
  providers: [UsageService]
})
export class UsageModule {}
