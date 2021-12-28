import { CreateUsageDto } from "@/modules/usage/dto/create-usage.dto";
import { UpdateUsageDto } from '@/modules/usage/dto/update-usage.dto';
import { Usage } from "@/modules/usage/entities/usage.entity";
import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Usage)
export class UsageRepository extends Repository<Usage> {

  async getUsage(): Promise<Usage[]> {
    return this.find({ relations: ['car', 'driver'] })

  }

  async getUsageById(id: string): Promise<Usage> {
    const usage = await this.findOne(id, {
      relations: ['car', 'driver']
    })

    if (!usage) {
      throw new BadRequestException(`Usage with Id ${id} not found`)
    }

    return usage
  }

  async createUsage(createUsage: CreateUsageDto): Promise<Usage> {
    const { driverId, carId, motivation } = createUsage
    const registeredUsage = await this.find({ finalUsage: null })

    const filterUsage = registeredUsage.filter(usage => usage.driverId === driverId || usage.carId === carId)

    if (filterUsage.length !== 0) {
      throw new BadRequestException(`The driver ${driverId} or car ${carId} is already in use`)
    }

    const usage = this.create({
      driverId,
      carId,
      motivation,
      initialUsage: new Date()
    })

    await this.save(usage)

    return usage
  }

  async updateUsage(id: string, updateUsage: UpdateUsageDto): Promise<Usage> {
    const usage = await this.getUsageById(id)

    Object.assign(usage, updateUsage)

    await this.save(usage)

    return usage
  }

  async deleteUsage(id: string): Promise<void> {
    const usage = await this.getUsageById(id)

    if (usage.finalUsage !== null) {
      throw new BadRequestException(`The usage already finalized`)
    }

    await this.createQueryBuilder('usage')
      .update()
      .set({ finalUsage: new Date() })
      .where('id = :id')
      .setParameters({ id })
      .execute()

  }

}