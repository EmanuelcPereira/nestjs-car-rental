import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Driver {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column()
  name: string

  @ApiProperty()
  @Column()
  isDeleted: boolean

  constructor(driver?: Partial<Driver>) {
    this.id = driver?.id
    this.name = driver?.name
    this.isDeleted = driver?.isDeleted
  }
}
