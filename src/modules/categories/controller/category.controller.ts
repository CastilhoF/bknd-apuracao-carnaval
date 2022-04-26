import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpStatus,
  Res,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../user/decorators/get.user.decorator';
import { User } from '../../../database/entities/user.entity';
import { CreateCategoryDto } from '../dtos/create.category.dto';
import { CreatedCategoryDto } from '../../../core/config/documentation/dtos/created/created.category.dto';
import { Category } from '../../../database/entities/category.entity';
import { CreateCategoryItemDto } from '../dtos/create.category.items.dto';
import { CategoryItem } from '../../../database/entities/category.item.entity';
import { Logger } from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreatedCategoryItemDto } from '../../../core/config/documentation/dtos/created//created.category.item.dto';
import { CategoryDto } from '../../../core/config/documentation/dtos/single-objects/category';
import { CategoryItemDto } from '../../../core/config/documentation/dtos/single-objects/category.item';
import { UUIDVersion } from 'class-validator';

@ApiBearerAuth()
@Controller('categories')
@ApiTags('Categories')
@UseGuards(AuthGuard())
export class CategoryController {
  private logger = new Logger('CategoryController');

  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiBody({ type: CreateCategoryDto })
  @ApiOperation({ summary: 'Create Category' })
  @ApiCreatedResponse({
    description: 'The Category has been successfully created. ',
    type: CreatedCategoryDto,
  })
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Category> {
    this.logger.verbose(
      `User "${user.username}" creating a new category. Data: ${JSON.stringify(
        createCategoryDto,
      )}`,
    );
    res.status(HttpStatus.CREATED);
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Post('items')
  @ApiBody({ type: CreateCategoryItemDto })
  @ApiOperation({ summary: 'Create Category Item' })
  @ApiCreatedResponse({
    description: 'The Category Item has been successfully created. ',
    type: CreatedCategoryItemDto,
  })
  createCategoryItem(
    @Body() createCategoryItemDto: CreateCategoryItemDto,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CategoryItem> {
    this.logger.verbose(
      `User "${user.username}" creating a new category. Data: ${JSON.stringify(
        createCategoryItemDto,
      )}`,
    );
    res.status(HttpStatus.CREATED);
    return this.categoryService.createCategoryItem(createCategoryItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ description: 'Successfully', type: [CategoryDto] })
  findAllCategories(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
  ): Promise<Category[]> {
    this.logger.verbose(`User "${user.username}" find all categories.`);
    res.status(HttpStatus.OK);
    return this.categoryService.findAllCategories();
  }

  @Get('items')
  @ApiOperation({ summary: 'Get all category items' })
  @ApiOkResponse({ description: 'Successfully', type: [CategoryItemDto] })
  findAllCategoryItems(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
  ): Promise<CategoryItem[]> {
    this.logger.verbose(`User "${user.username}" find all categories items.`);
    res.status(HttpStatus.OK);
    return this.categoryService.findAllCategoryItems();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a category' })
  @ApiOkResponse({ description: 'Successfully', type: CategoryDto })
  findOneCategory(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @Param('id') id: UUIDVersion,
  ): Promise<Category> {
    this.logger.verbose(`User "${user.username}" find a category: ID - ${id}.`);
    res.status(HttpStatus.OK);
    return this.categoryService.findOneCategory(id);
  }

  @Get('items/:id')
  @ApiOperation({ summary: 'Get a category item' })
  @ApiOkResponse({ description: 'Successfully', type: CategoryItemDto })
  findOneCategoryItem(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @Param('id') id: UUIDVersion,
  ): Promise<CategoryItem> {
    this.logger.verbose(
      `User "${user.username}" find a category item: ID - ${id}.`,
    );
    res.status(HttpStatus.OK);
    return this.categoryService.findOneCategoryItem(id);
  }

  @Put(':id')
  @ApiBody({ type: CategoryDto })
  @ApiOperation({ summary: 'Update a category' })
  @ApiOkResponse({ description: 'Successfully', type: CategoryDto })
  updateCategory(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @Param('id') id: UUIDVersion,
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating a category: ID - ${id}. Data: ${JSON.stringify(
        createCategoryDto,
      )}`,
    );
    res.status(HttpStatus.OK);
    return this.categoryService.updateCategory(id, createCategoryDto);
  }

  @Put('items/:id')
  @ApiBody({ type: CategoryItemDto })
  @ApiOperation({ summary: 'Update a category item' })
  @ApiOkResponse({ description: 'Successfully', type: CategoryItemDto })
  updateCategoryItem(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @Param('id') id: UUIDVersion,
    @Body() createCategoryItemDto: CreateCategoryItemDto,
  ): Promise<CategoryItem> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating a category item: ID - ${id}. Data: ${JSON.stringify(
        createCategoryItemDto,
      )}`,
    );
    res.status(HttpStatus.OK);
    return this.categoryService.updateCategoryItem(id, createCategoryItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a category' })
  @ApiNoContentResponse({ description: 'Category Deleted Successfully' })
  deleteCategory(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @Param('id') id: UUIDVersion,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting a category: ID - ${id}.`,
    );
    res.status(HttpStatus.NO_CONTENT);
    return this.categoryService.deleteCategory(id);
  }

  @Delete('items/:id')
  @ApiOperation({ summary: 'Delete a category item' })
  @ApiNoContentResponse({ description: 'Category Item Deleted Successfully' })
  deleteCategoryItem(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @Param('id') id: UUIDVersion,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting a category item: ID - ${id}.`,
    );
    res.status(HttpStatus.NO_CONTENT);
    return this.categoryService.deleteCategoryItem(id);
  }
}
