import { DriversService } from '@/drivers/services/drivers.service';
import { CreateDriverDto } from '@/drivers/dto/create-driver.dto';
import { UpdateDriverDto } from '@/drivers/dto/update-driver.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('drivers')
@Controller('drivers')
export class DriversController {
  constructor (private readonly driversService: DriversService) { }

  @Post()
  create (@Body() createDriverDto: CreateDriverDto) {
    return this.driversService.create(createDriverDto);
  }

  @Get()
  getDrivers () {
    return this.driversService.findAll();
  }

  @Get(':id')
  getDriverById (@Param('id') id: string) {
    return this.driversService.findOne(id);
  }

  @Patch('/:id')
  update (@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(id, updateDriverDto);
  }

  @Delete(':id')
  delete (@Param('id') id: string) {
    return this.driversService.delete(id);
  }

  @Patch('/:id/status')
  restore (@Param('id') id: string) {
    return this.driversService.restore(id);
  }
}
