import { UsageService } from '@/usage/services/usage.service';
import { UsageController } from '@/usage/controllers/usage.controller';
import { UsageRepository } from '@/usage/repositories/usage.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UsageRepository])],
  controllers: [UsageController],
  providers: [UsageService]
})
export class UsageModule {}
