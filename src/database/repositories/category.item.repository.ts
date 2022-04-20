import {
  EntityRepository,
  Repository,
  Connection,
  FindManyOptions,
} from 'typeorm';
import { CategoryItem } from '../entities/category.item.entity';
import { CreateCategoryItemDto } from '../../modules/categories/dtos/create.category.items.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FormatDateAndTime } from '../../utils/format.date';
import { Logger } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { Judges } from '../entities/judges.entity';
import { Event } from '../entities/event.entity';

@EntityRepository(CategoryItem)
export class CategoryItemRepository extends Repository<CategoryItem> {
  private logger = new Logger('CategoryItemRepository');
  private categoryRepository: Repository<Category>;
  private judgeRepository: Repository<Judges>;
  private eventRepository: Repository<Event>;

  constructor(private connection: Connection) {
    super();
    this.categoryRepository = this.connection.getRepository<Category>(Category);
    this.judgeRepository = this.connection.getRepository<Judges>(Judges);
    this.eventRepository = this.connection.getRepository<Event>(Event);
  }

  async createCategoryItem(
    createCategoryItemDto: CreateCategoryItemDto,
  ): Promise<CategoryItem> {
    const { category, judges, event } = createCategoryItemDto;

    if (!category.id) {
      throw new BadRequestException('Category are required');
    }

    if (judges.length === 0) {
      throw new BadRequestException('Judge are required');
    }

    if (!event.id) {
      throw new BadRequestException('Event are required');
    }

    const createdAt = FormatDateAndTime(new Date());

    const updatedAt = FormatDateAndTime(new Date());

    const categoryObj = await this.categoryRepository.findOne(category.id);

    const judgesArray = [];
    judges.map(async (judge) => {
      const result = await this.judgeRepository.findOne(judge.id);
      judgesArray.push(result);
    });
    const eventObj = await this.eventRepository.findOne(event.id);

    const categoryItem = this.create({
      category: categoryObj,
      judges: judgesArray,
      event: eventObj,
      createdAt,
      updatedAt,
    });

    try {
      return await this.save(categoryItem);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Category name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAllCategoryItems(): Promise<CategoryItem[]> {
    const findOneOptions: FindManyOptions = {
      relations: ['category', 'judges', 'event'],
    };
    return await this.find(findOneOptions);
  }

  async findOneCategoryItem(id: string): Promise<CategoryItem> {
    const findOneOptions = {
      relations: ['category', 'judges', 'event'],
      where: { id },
    };
    return await this.findOne(findOneOptions);
  }

  async updateCategoryItem(
    id: string,
    createCategoryItemDto: CreateCategoryItemDto,
  ): Promise<CategoryItem> {
    const { category, judges, event } = createCategoryItemDto;

    const updatedAt = FormatDateAndTime(new Date());

    const categoryItem = await this.findOne(id);

    if (!categoryItem) {
      this.logger.error(`CategoryItem id "${id}" not found.`);
      throw new BadRequestException(`CategoryItem with ID "${id}" not found`);
    }

    categoryItem.category = category;
    categoryItem.judges = judges;
    categoryItem.event = event;
    categoryItem.updatedAt = updatedAt;

    try {
      return await this.save(categoryItem);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteCategoryItem(id: string): Promise<void> {
    const result = await this.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`CategoryItem with ID "${id}" not found`);
    }
  }
}
