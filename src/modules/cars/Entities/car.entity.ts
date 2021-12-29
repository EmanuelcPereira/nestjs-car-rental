import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  brand: string

  @Column()
  color: string

  @Column({ unique: true })
  licensePlate: string

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