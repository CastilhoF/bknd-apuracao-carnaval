import { EntityRepository, Repository } from 'typeorm';
import { Judges } from '../entities/judges.entity';
import { CreateJudgesDto } from '../../modules/judges/dtos/create.judges.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FormatDateAndTime } from '../../utils/format.date';
import { Logger } from '@nestjs/common';

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
    return await this.find();
  }

  async findOneJudges(id: string): Promise<Judges> {
    try {
      const found = await this.findOne(id);
      if (!found) {
        this.logger.error(`Judge id "${id}" not found.`);
        throw new NotFoundException(`Judge with ID "${id}" not found`);
      }
      return found;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async updateJudges(
    id: string,
    createJudgesDto: CreateJudgesDto,
  ): Promise<Judges> {
    const { name } = createJudgesDto;

    const date = new Date();

    const updatedAt = FormatDateAndTime(date);

    if (!id) {
      this.logger.error(`Judge id "${id}" not found.`);
      throw new NotFoundException(`Judge with ID "${id}" not found`);
    }

    const judges = await this.findOne(id);

    if (!judges) {
      this.logger.error(`Judge id "${id}" not found.`);
      throw new NotFoundException(`Judge with ID "${id}" not found`);
    }

    judges.name = name;
    judges.updatedAt = updatedAt;

    return await this.save(judges);
  }

  async deleteJudges(id: string): Promise<Judges> {
    const judges = await this.findOne(id);

    if (!judges) {
      this.logger.error(`Judge id "${id}" not found.`);
      throw new NotFoundException(`Judge with ID "${id}" not found`);
    }

    return await this.remove(judges);
  }
}
