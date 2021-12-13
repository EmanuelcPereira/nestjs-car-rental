import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Driver {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  isDeleted: boolean
}
