import { IsOptional } from "class-validator"

export class UpdateUsageDto {
  @IsOptional()
  driverId?: string

  @IsOptional()
  carId?: string

  @IsOptional()
  motivation?: string
}
