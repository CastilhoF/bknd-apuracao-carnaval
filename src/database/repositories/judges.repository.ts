import { EntityRepository, Repository } from 'typeorm';
import { Judges } from '../entities/judges.entity';
import { CreateJudgesDto } from '../../modules/judges/dtos/create.judges.dto';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FormatDateAndTime } from '../../utils/format.date';
import { Logger } from '@nestjs/common';
import { UUIDVersion } from 'class-validator';

@EntityRepository(Judges)
export class JudgesRepository extends Repository<Judges> {
  private logger = new Logger('JudgesRepository');

  async createJudges(createJudgesDto: CreateJudgesDto): Promise<Judges> {
    const { name } = createJudgesDto;

    const date = new Date();

    const createdAt = FormatDateAndTime(date);

    const updatedAt = FormatDateAndTime(date);

    const judges = this.create({ name, createdAt, updatedAt });

    try {
      return await this.save(judges);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Judge name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAllJudges(): Promise<Judges[]> {
    const found = await this.find();
    try {
      return found;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async findOneJudges(id: UUIDVersion): Promise<Judges> {
    const found = await this.findOne(id);
    if (!found) {
      this.logger.error(`Judge id "${id}" not found.`);
      throw new BadRequestException(`Judge with ID "${id}" not found`);
    }
    try {
      return found;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async updateJudges(
    id: UUIDVersion,
    createJudgesDto: CreateJudgesDto,
  ): Promise<Judges> {
    const { name } = createJudgesDto;

    const date = new Date();

    const updatedAt = FormatDateAndTime(date);

    const judges = await this.findOne(id);

    if (!judges) {
      this.logger.error(`Judge id "${id}" not found.`);
      throw new BadRequestException(`Judge with ID "${id}" not found`);
    }

    judges.name = name;
    judges.updatedAt = updatedAt;

    try {
      return await this.save(judges);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Judge name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteJudges(id: UUIDVersion): Promise<Judges> {
    const judges = await this.findOne(id);

    if (!judges) {
      this.logger.error(`Judge id "${id}" not found.`);
      throw new BadRequestException(`Judge with ID "${id}" not found`);
    }

    return await this.remove(judges);
  }
}
