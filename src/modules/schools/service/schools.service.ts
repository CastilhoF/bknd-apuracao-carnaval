import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schools } from 'src/database/entities/schools.entity';
import { CreateSchoolsDto } from 'src/modules/schools/dtos/create.schools.dto';
import { SchoolsRepository } from 'src/database/repositories/schools.repository';
import { GroupRepository } from 'src/database/repositories/groups.repository';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(SchoolsRepository)
    private schoolsRepository: SchoolsRepository,
    private groupRepository: GroupRepository,
  ) {}

  async createSchools(createSchoolsDto: CreateSchoolsDto): Promise<Schools> {
    const found = await this.groupRepository.findOneGroup(
      createSchoolsDto.group_id,
    );

    if (!found) {
      throw new NotFoundException(
        `Group with ID "${createSchoolsDto.group_id}" not found`,
      );
    }
    return this.schoolsRepository.createSchools(createSchoolsDto);
  }

  // async findAllSchools(): Promise<Schools[]> {
  //   return this.schoolsRepository.findAllSchools();
  // }

  // async findOneSchools(id: string): Promise<Schools> {
  //   const found = await this.schoolsRepository.findOneSchools(id);
  //   if (!found) {
  //     throw new NotFoundException(`Schools with ID "${id}" not found`);
  //   }
  //   return found;
  // }

  // async updateSchools(
  //   id: string,
  //   createSchoolsDto: CreateSchoolsDto,
  // ): Promise<Schools> {
  //   return this.schoolsRepository.updateSchools(id, createSchoolsDto);
  // }

  // async deleteSchools(id: string): Promise<void> {
  //   const schools = await this.schoolsRepository.findOneSchools(id);
  //   if (!schools) {
  //     throw new NotFoundException(`Schools with ID "${id}" not found`);
  //   }
  //   await this.schoolsRepository.delete(id);
  // }
}
