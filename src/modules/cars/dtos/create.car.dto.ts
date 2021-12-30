import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateCarDto {
  @ApiProperty()
  @IsNotEmpty()
  brand: string
  
  @ApiProperty()
  @IsNotEmpty()
  color: string

  @ApiProperty()
  @IsNotEmpty()
  licensePlate: string
}