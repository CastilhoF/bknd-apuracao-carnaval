import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schools } from '../../../database/entities/schools.entity';
import { CreateSchoolsDto } from '../../../modules/schools/dtos/create.schools.dto';
import { SchoolsRepository } from '../../../database/repositories/schools.repository';
import { UUIDVersion } from 'class-validator';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(SchoolsRepository)
    private schoolsRepository: SchoolsRepository,
  ) {}

  async createSchools(createSchoolsDto: CreateSchoolsDto): Promise<Schools> {
    return this.schoolsRepository.createSchools(createSchoolsDto);
  }

  async findAllSchools(): Promise<Schools[]> {
    return this.schoolsRepository.findAllSchools();
  }

  async findOneSchools(id: UUIDVersion): Promise<Schools> {
    const found = await this.schoolsRepository.findOneSchools(id);
    if (!found) {
      throw new NotFoundException(`Schools with ID "${id}" not found`);
    }
    return found;
  }

  async updateSchools(
    id: UUIDVersion,
    createSchoolsDto: CreateSchoolsDto,
  ): Promise<Schools> {
    return this.schoolsRepository.updateSchools(id, createSchoolsDto);
  }

  async deleteSchools(id: UUIDVersion): Promise<void> {
    const schools = await this.schoolsRepository.findOneSchools(id);
    if (!schools) {
      throw new NotFoundException(`Schools with ID "${id}" not found`);
    }
    await this.schoolsRepository.deleteSchools(id);
  }
}
