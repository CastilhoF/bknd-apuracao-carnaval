import { EntityRepository, Repository } from 'typeorm';
import { Schools } from '../entities/schools.entity';
import { CreateSchoolsDto } from '../../modules/schools/dtos/create.schools.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FormatDateAndTime } from '../../utils/format.date';
import { Logger } from '@nestjs/common';

@EntityRepository(Schools)
export class SchoolsRepository extends Repository<Schools> {
  private logger = new Logger('SchoolsRepository');

  async createSchools(createSchoolsDto: CreateSchoolsDto): Promise<Schools> {
    const { name, city } = createSchoolsDto;

    const date = new Date();

    const createdAt = FormatDateAndTime(date);

    const updatedAt = FormatDateAndTime(date);

    const schools = this.create({ name, city, createdAt, updatedAt });

    try {
      return await this.save(schools);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('School name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAllSchools(): Promise<Schools[]> {
    return await this.find();
  }

  async findOneSchools(id: string): Promise<Schools> {
    try {
      const found = await this.findOne(id);
      if (!found) {
        this.logger.error(`School id "${id}" not found.`);
        throw new NotFoundException(`School with ID "${id}" not found`);
      }
      return found;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async updateSchools(
    id: string,
    createSchoolsDto: CreateSchoolsDto,
  ): Promise<Schools> {
    const { name, city } = createSchoolsDto;

    const date = new Date();

    const updatedAt = FormatDateAndTime(date);

    const schools = await this.findOne(id);

    if (!schools) {
      this.logger.error(`School id "${id}" not found.`);
      throw new NotFoundException(`School with ID "${id}" not found`);
    }

    schools.name = name;
    schools.city = city;
    schools.updatedAt = updatedAt;

    return await this.save(schools);
  }

  async deleteSchools(id: string): Promise<void> {
    const schools = await this.findOne(id);

    if (!schools) {
      this.logger.error(`School id "${id}" not found.`);
      throw new NotFoundException(`School with ID "${id}" not found`);
    }

    await this.delete(schools);
  }
}
