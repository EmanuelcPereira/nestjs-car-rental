import { Module } from '@nestjs/common';
import { DriversService } from '@/modules/drivers/services/drivers.service';
import { DriversController } from '@/modules/drivers/controllers/drivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversRepository } from '@/modules/drivers/repositories/drivers.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DriversRepository])],
  controllers: [DriversController],
  providers: [DriversService]
})
export class DriversModule {}
