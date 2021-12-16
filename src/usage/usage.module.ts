import { Module } from '@nestjs/common';
import { UsageService } from './usage.service';
import { UsageController } from './usage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageRepository } from './usage.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsageRepository])],
  controllers: [UsageController],
  providers: [UsageService]
})
export class UsageModule {}
