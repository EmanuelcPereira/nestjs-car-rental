import { Module } from '@nestjs/common';
import { DriversService } from '@/drivers/services/drivers.service';
import { DriversController } from '@/drivers/controllers/drivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversRepository } from '@/drivers/repositories/drivers.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DriversRepository])],
  controllers: [DriversController],
  providers: [DriversService]
})
export class DriversModule {}
