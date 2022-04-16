import { EntityRepository, Repository } from 'typeorm';
import { Judges } from '../entities/judges.entity';
import { CreateJudgesDto } from '../../modules/judges/dtos/create.judges.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FormatDateAndTime } from 'src/utils/format.date';
import { Logger } from '@nestjs/common';

@EntityRepository(Judges)
export class JudgesRepository extends Repository<Judges> {
  private logger = new Logger('JudgesRepository');

  async createJudges(createJudgesDto: CreateJudgesDto): Promise<Judges> {
    const { name, question_id } = createJudgesDto;

    const date = new Date();

    const createdAt = FormatDateAndTime(date);

    const updatedAt = FormatDateAndTime(date);

    const judges = this.create({ name, question_id, createdAt, updatedAt });

    try {
      return await this.save(judges);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Judges name already exists');
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
        this.logger.error(`Judges id "${id}" not found.`);
        throw new NotFoundException(`Judges with ID "${id}" not found`);
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
    const { name, question_id } = createJudgesDto;

    const date = new Date();

    const updatedAt = FormatDateAndTime(date);

    if (!id) {
      this.logger.error(`Judges id "${id}" not found.`);
      throw new NotFoundException(`Judges with ID "${id}" not found`);
    }

    const judges = await this.findOne(id);

    if (!judges) {
      this.logger.error(`Judges id "${id}" not found.`);
      throw new NotFoundException(`Judges with ID "${id}" not found`);
    }

    judges.name = name;
    judges.question_id = question_id;
    judges.updatedAt = updatedAt;

    return await this.save(judges);
  }

  async deleteJudges(id: string): Promise<Judges> {
    const judges = await this.findOne(id);

    if (!judges) {
      this.logger.error(`Judges id "${id}" not found.`);
      throw new NotFoundException(`Judges with ID "${id}" not found`);
    }

    return await this.remove(judges);
  }
}
