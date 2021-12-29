import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  isDeleted: boolean

  constructor(driver?: Partial<Driver>) {
    this.id = driver?.id
    this.name = driver?.name
    this.isDeleted = driver?.isDeleted
  }
}
