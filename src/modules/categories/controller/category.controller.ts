import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../user/decorators/get.user.decorator';
import { User } from '../../../database/entities/user.entity';
import { CreateCategoryDto } from '../dtos/create.category.dto';
import { Category } from '../../../database/entities/category.entity';
import { CreateCategoryItemDto } from '../dtos/create.category.items.dto';
import { CategoryItem } from '../../../database/entities/category.item.entity';
import { Logger } from '@nestjs/common';
import { CategoryService } from '../services/category.service';

@Controller('categories')
@UseGuards(AuthGuard())
export class CategoryController {
  private logger = new Logger('CategoryController');

  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: User,
  ): Promise<Category> {
    this.logger.verbose(
      `User "${user.username}" creating a new category. Data: ${JSON.stringify(
        createCategoryDto,
      )}`,
    );
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Post('items')
  createCategoryItem(
    @Body() createCategoryItemDto: CreateCategoryItemDto,
    @GetUser() user: User,
  ): Promise<CategoryItem> {
    this.logger.verbose(
      `User "${user.username}" creating a new category. Data: ${JSON.stringify(
        createCategoryItemDto,
      )}`,
    );
    return this.categoryService.createCategoryItem(createCategoryItemDto);
  }

  @Get()
  findAllCategories(@GetUser() user: User): Promise<Category[]> {
    this.logger.verbose(`User "${user.username}" find all categories.`);
    return this.categoryService.findAllCategories();
  }

  @Get('items')
  findAllCategoryItems(@GetUser() user: User): Promise<CategoryItem[]> {
    this.logger.verbose(`User "${user.username}" find all categories items.`);
    return this.categoryService.findAllCategoryItems();
  }

  @Get(':id')
  findOneCategory(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Category> {
    this.logger.verbose(`User "${user.username}" find a category: ID - ${id}.`);
    return this.categoryService.findOneCategory(id);
  }

  @Get('items/:id')
  findOneCategoryItem(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<CategoryItem> {
    this.logger.verbose(
      `User "${user.username}" find a category item: ID - ${id}.`,
    );
    return this.categoryService.findOneCategoryItem(id);
  }

  @Patch(':id')
  updateCategory(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating a category: ID - ${id}. Data: ${JSON.stringify(
        createCategoryDto,
      )}`,
    );
    return this.categoryService.updateCategory(id, createCategoryDto);
  }

  @Patch('items/:id')
  updateCategoryItem(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() createCategoryItemDto: CreateCategoryItemDto,
  ): Promise<CategoryItem> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating a category item: ID - ${id}. Data: ${JSON.stringify(
        createCategoryItemDto,
      )}`,
    );
    return this.categoryService.updateCategoryItem(id, createCategoryItemDto);
  }

  @Delete(':id')
  deleteCategory(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting a category: ID - ${id}.`,
    );
    return this.categoryService.deleteCategory(id);
  }

  @Delete('items/:id')
  deleteCategoryItem(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting a category item: ID - ${id}.`,
    );
    return this.categoryService.deleteCategoryItem(id);
  }
}
