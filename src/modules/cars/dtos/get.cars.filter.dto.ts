import { IsOptional } from "class-validator"

export class GetCarsFilterDto {
  @IsOptional()
  brand?: string

  @IsOptional()
  color?: string

  @IsOptional()
  licensePlate?: string
}