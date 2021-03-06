import { EntityRepository, Repository, Connection } from 'typeorm';
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
import { Event } from '../entities/event.entity';
import { UUIDVersion } from 'class-validator';

@EntityRepository(Penalties)
export class PenaltiesRepository extends Repository<Penalties> {
  private logger = new Logger('PenaltiesRepository');
  private schoolsRepository: Repository<Schools>;
  private eventRepository: Repository<Event>;

  constructor(private connection: Connection) {
    super();
    this.schoolsRepository = this.connection.getRepository<Schools>(Schools);
    this.eventRepository = this.connection.getRepository<Event>(Event);
  }

  async createPenalties(
    createPenaltiesDto: CreatePenaltiesDto,
  ): Promise<Penalties> {
    const { event, school, value } = createPenaltiesDto;

    if (!event.id) {
      throw new BadRequestException('Event are required');
    }

    if (!school.id) {
      throw new BadRequestException('School are required');
    }

    if (!value) {
      throw new BadRequestException('Value are required');
    }

    const createdAt = FormatDateAndTime(new Date());

    const updatedAt = FormatDateAndTime(new Date());

    const eventObj = await this.eventRepository.findOne(event.id);

    const schoolObj = await this.schoolsRepository.findOne(school.id);

    const penalty = this.create({
      event: eventObj,
      school: schoolObj,
      value,
      createdAt,
      updatedAt,
    });

    try {
      return await this.save(penalty);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Category name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAllPenalties(): Promise<Penalties[]> {
    return await this.find();
  }

  async findPenaltiesById(id: UUIDVersion): Promise<Penalties> {
    const found = await this.findOne(id);
    if (!found) {
      this.logger.error(`Penalty id "${id}" not found.`);
      throw new BadRequestException(`Penalty with ID "${id}" not found`);
    }
    return found;
  }

  async updatePenalties(
    id: UUIDVersion,
    createPenaltiesDto: CreatePenaltiesDto,
  ): Promise<Penalties> {
    const { school, value } = createPenaltiesDto;

    if (!school.id) {
      throw new BadRequestException('School are required');
    }

    if (!value) {
      throw new BadRequestException('Value are required');
    }

    const updatedAt = FormatDateAndTime(new Date());

    const penalties = await this.findOne(id);

    if (!penalties) {
      this.logger.error(`Penalty id "${id}" not exists.`);
      throw new BadRequestException('Penalty not exists');
    }

    penalties.school = school;
    penalties.value = value;
    penalties.updatedAt = updatedAt;

    try {
      return await this.save(penalties);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deletePenalties(id: UUIDVersion): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Penalty not found');
    }
  }
}
