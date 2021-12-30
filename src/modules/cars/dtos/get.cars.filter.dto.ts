import { ApiProperty } from "@nestjs/swagger"
import { IsOptional } from "class-validator"

export class GetCarsFilterDto {
  @ApiProperty()
  @IsOptional()
  brand?: string

  @ApiProperty()
  @IsOptional()
  color?: string

  @ApiProperty()
  @IsOptional()
  licensePlate?: string
}