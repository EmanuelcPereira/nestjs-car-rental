import { IsOptional } from "class-validator"

export class UpdateCarInfosDto {
  @IsOptional()
  brand?: string

  @IsOptional()
  color?: string
}