import { EntityRepository, Repository } from 'typeorm';
import { Verification } from '../entities/verification.entity';
import { CreateVerificationDto } from '../../modules/verification/dtos/create.verification.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FormatDateAndTime } from '../../utils/format.date';
import { Logger } from '@nestjs/common';

@EntityRepository(Verification)
export class VerificationRepository extends Repository<Verification> {
  private logger = new Logger('VerificationRepository');

  async createVerification(
    createVerificationDto: CreateVerificationDto,
  ): Promise<Verification> {
    const {
      judge_name,
      question_name,
      school_name,
      group_name,
      event_name,
      note_value,
    } = createVerificationDto;

    const date = new Date();

    const createdAt = FormatDateAndTime(date);

    const updatedAt = FormatDateAndTime(date);

    const verification = this.create({
      judge_name,
      question_name,
      school_name,
      group_name,
      event_name,
      note_value,
      createdAt,
      updatedAt,
    });

    try {
      return await this.save(verification);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Verification name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAllVerifications(): Promise<Verification[]> {
    return await this.find();
  }

  async findOneVerification(id: string): Promise<Verification> {
    try {
      const found = await this.findOne(id);
      if (!found) {
        this.logger.error(`Verification with id ${id} not found`);
        throw new NotFoundException(`Verification with id ${id} not found`);
      }
      return found;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async updateVerification(
    id: string,
    createVerificationDto: CreateVerificationDto,
  ): Promise<Verification> {
    const {
      judge_name,
      question_name,
      school_name,
      group_name,
      event_name,
      note_value,
    } = createVerificationDto;

    const date = new Date();

    const updatedAt = FormatDateAndTime(date);

    if (!id) {
      this.logger.error(`Verification id ${id} not found`);
      throw new NotFoundException(`Verification with id ${id} not found`);
    }

    const verification = await this.findOne(id);

    if (!verification) {
      this.logger.error(`Verification with id ${id} not found`);
      throw new NotFoundException(`Verification with id ${id} not found`);
    }

    verification.judge_name = judge_name;
    verification.question_name = question_name;
    verification.school_name = school_name;
    verification.group_name = group_name;
    verification.event_name = event_name;
    verification.note_value = note_value;
    verification.updatedAt = updatedAt;

    return await this.save(verification);
  }

  async deleteVerification(id: string): Promise<void> {
    const verification = await this.findOne(id);
    if (!verification) {
      this.logger.error(`Verification with id ${id} not found.`);
      throw new NotFoundException(`Verification with ID "${id}" not found`);
    }
    await this.delete(id);
  }
}
