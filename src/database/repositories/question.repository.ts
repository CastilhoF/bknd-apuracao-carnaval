import { EntityRepository, Repository } from 'typeorm';
import { Questions } from '../entities/questions.entity';
import { CreateQuestionDto } from '../../modules/questions/dtos/create.question.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FormatDateAndTime } from '../../utils/format.date';
import { Logger } from '@nestjs/common';

@EntityRepository(Questions)
export class QuestionsRepository extends Repository<Questions> {
  private logger = new Logger('QuestionsRepository');

  async createQuestions(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Questions> {
    const {
      question_name,
      judge_one_id,
      judge_two_id,
      judge_three_id,
      judge_four_id,
      judge_five_id,
    } = createQuestionDto;

    const date = new Date();

    const createdAt = FormatDateAndTime(date);

    const updatedAt = FormatDateAndTime(date);

    const question = this.create({
      question_name,
      judge_one_id,
      judge_two_id,
      judge_three_id,
      judge_four_id,
      judge_five_id,
      createdAt,
      updatedAt,
    });

    try {
      return await this.save(question);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Question name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAllQuestions(): Promise<Questions[]> {
    return await this.find();
  }

  async findOneQuestion(id: string): Promise<Questions> {
    try {
      const found = await this.findOne(id);
      if (!found) {
        this.logger.error(`Question id "${id}" not found.`);
        throw new NotFoundException(`Question with ID "${id}" not found`);
      }
      return found;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async updateQuestion(
    id: string,
    createQuestionDto: CreateQuestionDto,
  ): Promise<Questions> {
    const {
      question_name,
      judge_one_id,
      judge_two_id,
      judge_three_id,
      judge_four_id,
      judge_five_id,
    } = createQuestionDto;

    const date = new Date();

    const updatedAt = FormatDateAndTime(date);

    if (!id) {
      this.logger.error(`Question id "${id}" not found.`);
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }

    const question = await this.findOne(id);

    if (!question) {
      this.logger.error(`Question id "${id}" not found.`);
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }

    question.question_name = question_name;
    question.judge_one_id = judge_one_id;
    question.judge_two_id = judge_two_id;
    question.judge_three_id = judge_three_id;
    question.judge_four_id = judge_four_id;
    question.judge_five_id = judge_five_id;
    question.updatedAt = updatedAt;

    return await this.save(question);
  }

  async deleteQuestion(id: string): Promise<void> {
    const question = await this.findOne(id);

    if (!question) {
      this.logger.error(`Question id "${id}" not found.`);
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }

    await this.delete(question);
  }
}
