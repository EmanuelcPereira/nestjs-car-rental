import { IsNotEmpty } from "class-validator"

export class CreateUsageDto {
  @IsNotEmpty()
  driverId: string

  @IsNotEmpty()
  carId: string

  @IsNotEmpty()
  motivation: string
}
