import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../../modules/categories/dtos/create.category.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FormatDateAndTime } from '../../utils/format.date';
import { Logger } from '@nestjs/common';

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
    return await this.find();
  }

  async findOneCategory(id: string): Promise<Category> {
    return await this.findOne(id);
  }

  async findOneCategoryByName(name: string): Promise<Category> {
    return await this.findOne({ name });
  }

  async updateCategory(
    id: string,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;

    const updatedAt = FormatDateAndTime(new Date());

    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }

    category.name = name;
    category.updatedAt = updatedAt;

    return await this.save(category);
  }

  async deleteCategory(id: string): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
  }
}
