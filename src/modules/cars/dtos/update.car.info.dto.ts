import { ApiProperty } from "@nestjs/swagger"
import { IsOptional } from "class-validator"

export class UpdateCarInfosDto {
  @ApiProperty()
  @IsOptional()
  brand?: string

  @ApiProperty()
  @IsOptional()
  color?: string
}