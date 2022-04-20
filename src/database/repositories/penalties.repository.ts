import {
  EntityRepository,
  Repository,
  Connection,
  FindManyOptions,
} from 'typeorm';
import { Penalties } from '../entities/penalties.entity';
import { CreatePenaltiesDto } from '../../modules/penalties/dtos/create.penalties.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FormatDateAndTime } from '../../utils/format.date';
import { Logger } from '@nestjs/common';
import { Schools } from '../entities/schools.entity';

@EntityRepository(Penalties)
export class PenaltiesRepository extends Repository<Penalties> {
  private logger = new Logger('PenaltiesRepository');
  private schoolsRepository: Repository<Schools>;

  constructor(private connection: Connection) {
    super();
    this.schoolsRepository = this.connection.getRepository<Schools>(Schools);
  }

  async createPenalties(
    createPenaltiesDto: CreatePenaltiesDto,
  ): Promise<Penalties> {
    const { school, value } = createPenaltiesDto;

    if (!school.id) {
      throw new BadRequestException('School are required');
    }

    if (!value) {
      throw new BadRequestException('Value are required');
    }

    const createdAt = FormatDateAndTime(new Date());

    const updatedAt = FormatDateAndTime(new Date());

    const schoolObj = await this.schoolsRepository.findOne(school.id);

    const penalties = this.create({
      school: schoolObj,
      value,
      createdAt,
      updatedAt,
    });

    try {
      return await this.save(penalties);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Category name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // async findAllPenalties(): Promise<Penalties[]> {
  //   const findOneOptions: FindManyOptions<Penalties> = {
  //     relations: ['school'],
  //   };
  //   return await this.find(findOneOptions);
  // }

  // async findPenaltiesById(id: string): Promise<Penalties> {
  //   const findOneOptions: FindManyOptions<Penalties> = {
  //     relations: ['school'],
  //     where: { id },
  //   };
  //   return await this.findOne(findOneOptions);
  // }

  // async updatePenalties(
  //   id: string,
  //   createPenaltiesDto: CreatePenaltiesDto,
  // ): Promise<Penalties> {
  //   const { school, value } = createPenaltiesDto;

  //   const updatedAt = FormatDateAndTime(new Date());

  //   const penalties = await this.findPenaltiesById(id);

  //   if (!penalties) {
  //     this.logger.error(`Penalty id "${id}" not exists.`);
  //     throw new BadRequestException('Penalty not exists');
  //   }

  //   penalties.school = school;
  //   penalties.value = value;
  //   penalties.updatedAt = updatedAt;

  //   try {
  //     return await this.save(penalties);
  //   } catch (error) {
  //     throw new InternalServerErrorException();
  //   }
  // }

  // async deletePenalties(id: string): Promise<void> {
  //   const result = await this.delete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException('Penalty not found');
  //   }
  // }
}
