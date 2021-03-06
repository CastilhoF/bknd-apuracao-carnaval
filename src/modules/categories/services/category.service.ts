import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../../database/entities/category.entity';
import { CategoryItem } from '../../../database/entities/category.item.entity';
import { CreateCategoryDto } from '../dtos/create.category.dto';
import { CreateCategoryItemDto } from '../dtos/create.category.items.dto';
import { CategoryRepository } from '../../../database/repositories/category.repository';
import { CategoryItemRepository } from '../../../database/repositories/category.item.repository';
import { UUIDVersion } from 'class-validator';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private readonly categoryRepository: CategoryRepository,
    @InjectRepository(CategoryItemRepository)
    private readonly categoryItemRepository: CategoryItemRepository,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryRepository.createCategory(createCategoryDto);
  }

  async createCategoryItem(
    createCategoryItemDto: CreateCategoryItemDto,
  ): Promise<CategoryItem> {
    return this.categoryItemRepository.createCategoryItem(
      createCategoryItemDto,
    );
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.findAllCategories();
  }

  async findAllCategoryItems(): Promise<CategoryItem[]> {
    return this.categoryItemRepository.findAllCategoryItems();
  }

  async findOneCategory(id: UUIDVersion): Promise<Category> {
    const category = await this.categoryRepository.findOneCategory(id);
    if (!category) {
      throw new BadRequestException(`Category with ID "${id}" not found`);
    }
    return category;
  }

  async findOneCategoryItem(id: UUIDVersion): Promise<CategoryItem> {
    const categoryItem = await this.categoryItemRepository.findOneCategoryItem(
      id,
    );
    return categoryItem;
  }

  async updateCategory(
    id: UUIDVersion,
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    if (!id) {
      throw new BadRequestException('Category id is required');
    }
    return this.categoryRepository.updateCategory(id, createCategoryDto);
  }

  async updateCategoryItem(
    id: UUIDVersion,
    createCategoryItemDto: CreateCategoryItemDto,
  ): Promise<CategoryItem> {
    return this.categoryItemRepository.updateCategoryItem(
      id,
      createCategoryItemDto,
    );
  }

  async deleteCategory(id: UUIDVersion): Promise<void> {
    return this.categoryRepository.deleteCategory(id);
  }

  async deleteCategoryItem(id: UUIDVersion): Promise<void> {
    return this.categoryItemRepository.deleteCategoryItem(id);
  }
}
