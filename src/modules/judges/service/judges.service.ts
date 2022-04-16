import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Judges } from 'src/database/entities/judges.entity';
import { CreateJudgesDto } from 'src/modules/judges/dtos/create.judges.dto';
import { JudgesRepository } from 'src/database/repositories/judges.repository';
import { QuestionsRepository } from 'src/database/repositories/question.repository';

@Injectable()
export class JudgesService {
  constructor(
    @InjectRepository(JudgesRepository)
    private judgesRepository: JudgesRepository,
    private questionsRepository: QuestionsRepository,
  ) {}

  async createJudges(createJudgesDto: CreateJudgesDto): Promise<Judges> {
    const found = await this.questionsRepository.findOneQuestion(
      createJudgesDto.question_id,
    );

    if (!found) {
      throw new NotFoundException(
        `Group with ID "${createJudgesDto.question_id}" not found`,
      );
    }
    return this.judgesRepository.createJudges(createJudgesDto);
  }

  // async findAllJudges(): Promise<Judges[]> {
  //   return this.judgesRepository.findAllJudges();
  // }

  // async findOneJudges(id: string): Promise<Judges> {
  //   const found = await this.judgesRepository.findOneJudges(id);
  //   if (!found) {
  //     throw new NotFoundException(`Judges with ID "${id}" not found`);
  //   }
  //   return found;
  // }

  // async updateJudges(
  //   id: string,
  //   createJudgesDto: CreateJudgesDto,
  // ): Promise<Judges> {
  //   return this.judgesRepository.updateJudges(id, createJudgesDto);
  // }

  // async deleteJudges(id: string): Promise<void> {
  //   const judges = await this.judgesRepository.findOneJudges(id);
  //   if (!judges) {
  //     throw new NotFoundException(`Judges with ID "${id}" not found`);
  //   }
  //   await this.judgesRepository.delete(id);
  // }
}
