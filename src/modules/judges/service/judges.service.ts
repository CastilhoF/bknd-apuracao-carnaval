import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Judges } from '../../../database/entities/judges.entity';
import { CreateJudgesDto } from '../../../modules/judges/dtos/create.judges.dto';
import { JudgesRepository } from '../../../database/repositories/judges.repository';

@Injectable()
export class JudgesService {
  constructor(
    @InjectRepository(JudgesRepository)
    private judgesRepository: JudgesRepository,
  ) {}

  async createJudges(createJudgesDto: CreateJudgesDto): Promise<Judges> {
    return this.judgesRepository.createJudges(createJudgesDto);
  }

  async findAllJudges(): Promise<Judges[]> {
    return this.judgesRepository.findAllJudges();
  }

  async findOneJudges(id: string): Promise<Judges> {
    const found = await this.judgesRepository.findOneJudges(id);
    if (!found) {
      throw new NotFoundException(`Judges with ID "${id}" not found`);
    }
    return found;
  }

  async updateJudges(
    id: string,
    createJudgesDto: CreateJudgesDto,
  ): Promise<Judges> {
    return this.judgesRepository.updateJudges(id, createJudgesDto);
  }

  async deleteJudges(id: string): Promise<void> {
    const judges = await this.judgesRepository.findOneJudges(id);
    if (!judges) {
      throw new NotFoundException(`Judges with ID "${id}" not found`);
    }
    await this.judgesRepository.delete(id);
  }
}
