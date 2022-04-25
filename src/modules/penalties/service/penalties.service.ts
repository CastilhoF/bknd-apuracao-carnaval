import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Penalties } from '../../../database/entities/penalties.entity';
import { CreatePenaltiesDto } from '../../../modules/penalties/dtos/create.penalties.dto';
import { PenaltiesRepository } from '../../../database/repositories/penalties.repository';
import { UUIDVersion } from 'class-validator';

@Injectable()
export class PenaltiesService {
  constructor(
    @InjectRepository(PenaltiesRepository)
    private readonly penaltiesRepository: PenaltiesRepository,
  ) {}

  async createPenalties(
    createPenaltiesDto: CreatePenaltiesDto,
  ): Promise<Penalties> {
    return this.penaltiesRepository.createPenalties(createPenaltiesDto);
  }

  async findAllPenalties(): Promise<Penalties[]> {
    return this.penaltiesRepository.findAllPenalties();
  }

  async findOnePenalties(id: UUIDVersion): Promise<Penalties> {
    return await this.penaltiesRepository.findPenaltiesById(id);
  }

  async updatePenalties(
    id: UUIDVersion,
    createPenaltiesDto: CreatePenaltiesDto,
  ): Promise<Penalties> {
    return await this.penaltiesRepository.updatePenalties(
      id,
      createPenaltiesDto,
    );
  }

  async deletePenalties(id: UUIDVersion): Promise<void> {
    return this.penaltiesRepository.deletePenalties(id);
  }
}
