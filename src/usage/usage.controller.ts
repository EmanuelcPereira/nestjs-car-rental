import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsageService } from './usage.service';
import { CreateUsageDto } from './dto/create-usage.dto';
import { UpdateUsageDto } from './dto/update-usage.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usage')
@Controller('usage')
export class UsageController {
  constructor (private readonly usageService: UsageService) { }

  @Post()
  create (@Body() createUsageDto: CreateUsageDto) {
    return this.usageService.create(createUsageDto);
  }

  @Get()
  findAll () {
    return this.usageService.getUsage();
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.usageService.getUsageById(id);
  }

  @Patch(':id')
  update (@Param('id') id: string, @Body() updateUsageDto: UpdateUsageDto) {
    return this.usageService.update(id, updateUsageDto);
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.usageService.delete(id);
  }
}
