import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../../modules/categories/dtos/create.category.dto';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FormatDateAndTime } from '../../utils/format.date';
import { Logger } from '@nestjs/common';
import { UUIDVersion } from 'class-validator';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  private logger = new Logger('CategoryRepository');

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;

    const createdAt = FormatDateAndTime(new Date());

    const updatedAt = FormatDateAndTime(new Date());

    const category = this.create({
      name,
      createdAt,
      updatedAt,
    });

    try {
      return await this.save(category);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Category name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAllCategories(): Promise<Category[]> {
    const found = await this.find();
    try {
      return found;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async findOneCategory(id: UUIDVersion): Promise<Category> {
    const found = await this.findOne(id);
    if (!found) {
      throw new BadRequestException(`Category with ID "${id}" not found`);
    }
    try {
      return found;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async findOneCategoryByName(name: string): Promise<Category> {
    const found = await this.findOne({ where: { name } });
    if (!found) {
      throw new BadRequestException(`Category with name "${name}" not found`);
    }
    try {
      return found;
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }

  async updateCategory(
    id: UUIDVersion,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;

    const updatedAt = FormatDateAndTime(new Date());

    if (!id || null) {
      throw new BadRequestException('Category id is required');
    }

    const category = await this.findOneCategory(id);

    if (!category) {
      throw new BadRequestException(`Category with ID "${id}" not found`);
    }

    category.name = name;
    category.updatedAt = updatedAt;

    try {
      return await this.save(category);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Category name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async deleteCategory(id: UUIDVersion): Promise<void> {
    const found = await this.findOne(id);
    if (!found) {
      throw new BadRequestException(`Category with ID "${id}" not found`);
    }
    try {
      await this.delete(id);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException();
    }
  }
}
