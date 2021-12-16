import { Car } from '@/modules/cars/Entities/car.entity';
import { Driver } from '@/modules/drivers/entities/driver.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
