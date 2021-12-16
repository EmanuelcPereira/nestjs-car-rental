import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Driver } from '../../drivers/entities/driver.entity';
import { Car } from '../../cars/car.entity';

@Entity()
export class Usage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  initialUsage: Date

  @Column({ nullable: true })
  finalUsage: Date

  @Column()
  motivation: string

  @Column()
  driverId: string

  @ManyToOne(() => Driver)
  @JoinColumn({ name: 'driverId' })
  driver: Driver

  @Column()
  carId: string

  @ManyToOne(() => Car)
  @JoinColumn({ name: 'carId' })
  car: Car
}
