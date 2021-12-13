import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriversRepository } from './drivers.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DriversRepository])],
  controllers: [DriversController],
  providers: [DriversService]
})
export class DriversModule {}
