import { IsOptional } from "class-validator"

export class FilterUsageDto {
  @IsOptional()
  driverId?: string

  @IsOptional()
  carId?: string

  @IsOptional()
  finalUsage?: Date
}