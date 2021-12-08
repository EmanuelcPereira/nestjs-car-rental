import { IsNotEmpty } from "class-validator"

export class CreateCarDto {
  @IsNotEmpty()
  brand: string
  
  @IsNotEmpty()
  color: string

  @IsNotEmpty()
  licensePlate: string
}