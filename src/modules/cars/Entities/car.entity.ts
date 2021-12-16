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
}