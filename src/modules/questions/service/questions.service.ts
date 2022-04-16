import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questions } from '../../../database/entities/questions.entity';
import { CreateQuestionDto } from '../dtos/create.question.dto';
import { QuestionsRepository } from '../../../database/repositories/question.repository';
import { JudgesRepository } from '../../../database/repositories/judges.repository';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionsRepository)
    private questionsRepository: QuestionsRepository,
    private judgesRepository: JudgesRepository,
  ) {}

  async createQuestions(
    createQuestionDto: CreateQuestionDto,
  ): Promise<Questions> {
    const found1 = await this.judgesRepository.findOneJudges(
      createQuestionDto.judge_one_id,
    );

    const found2 = await this.judgesRepository.findOneJudges(
      createQuestionDto.judge_two_id,
    );

    const found3 = await this.judgesRepository.findOneJudges(
      createQuestionDto.judge_three_id,
    );

    const found4 = await this.judgesRepository.findOneJudges(
      createQuestionDto.judge_four_id,
    );

    const found5 = await this.judgesRepository.findOneJudges(
      createQuestionDto.judge_five_id,
    );

    if (!found1) {
      throw new NotFoundException(
        `Judge with ID "${createQuestionDto.judge_one_id}" not found`,
      );
    }

    if (!found2) {
      throw new NotFoundException(
        `Judge with ID "${createQuestionDto.judge_two_id}" not found`,
      );
    }

    if (!found3) {
      throw new NotFoundException(
        `Judge with ID "${createQuestionDto.judge_three_id}" not found`,
      );
    }

    if (!found4) {
      throw new NotFoundException(
        `Judge with ID "${createQuestionDto.judge_four_id}" not found`,
      );
    }

    if (!found5) {
      throw new NotFoundException(
        `Judge with ID "${createQuestionDto.judge_five_id}" not found`,
      );
    }

    return this.questionsRepository.createQuestions(createQuestionDto);
  }

  async findAllQuestions(): Promise<Questions[]> {
    return await this.questionsRepository.findAllQuestions();
  }

  async findOneQuestion(id: string): Promise<Questions> {
    try {
      const found = await this.questionsRepository.findOneQuestion(id);
      if (!found) {
        throw new NotFoundException(`Question with ID "${id}" not found`);
      }
      return found;
    } catch (error) {
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }
  }

  async updateQuestion(
    id: string,
    createQuestionDto: CreateQuestionDto,
  ): Promise<Questions> {
    return this.questionsRepository.updateQuestion(id, createQuestionDto);
  }

  async deleteQuestion(id: string): Promise<void> {
    const question = await this.questionsRepository.findOneQuestion(id);
    if (!question) {
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }
    return this.questionsRepository.deleteQuestion(id);
  }
}
