import { ApiProperty } from "@nestjs/swagger"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Car {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column()
  brand: string

  @ApiProperty()
  @Column()
  color: string

  @ApiProperty()
  @Column({ unique: true })
  licensePlate: string

  @ApiProperty()
  @Column()
  isDeleted: boolean

  constructor(car?: Partial<Car>) {
    this.id = car?.id
    this.brand = car?.brand
    this.color = car?.color
    this.licensePlate = car?.licensePlate
    this.isDeleted = car?.isDeleted
  }
}