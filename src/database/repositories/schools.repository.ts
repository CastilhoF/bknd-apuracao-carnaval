import { EntityRepository, Repository } from 'typeorm';
import { Schools } from '../entities/schools.entity';
import { CreateSchoolsDto } from '../../modules/schools/dtos/create.schools.dto';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FormatDateAndTime } from '../../utils/format.date';
import { Logger } from '@nestjs/common';
import { UUIDVersion } from 'class-validator';

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
    const found = await this.find();
    try {
      return found;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async findOneSchools(id: UUIDVersion): Promise<Schools> {
    const found = await this.findOne(id);
    if (!found) {
      this.logger.error(`School id "${id}" not found.`);
      throw new NotFoundException(`School with ID "${id}" not found`);
    }
    try {
      return found;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async updateSchools(
    id: UUIDVersion,
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

  async deleteSchools(id: UUIDVersion): Promise<void> {
    const schools = await this.findOne(id);

    if (!schools) {
      this.logger.error(`School id "${id}" not found.`);
      throw new BadRequestException(`School with ID "${id}" not found`);
    }
    try {
      await this.delete(schools);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
