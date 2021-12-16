import { IsOptional } from "class-validator";

export class UpdateDriverDto {
  @IsOptional()
  name?: string
}