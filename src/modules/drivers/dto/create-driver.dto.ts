import { IsNotEmpty } from "class-validator";

export class CreateDriverDto {
  @IsNotEmpty()
  name: string
}
