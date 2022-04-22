import { IsNotEmpty } from 'class-validator';
import { Category } from '../../../database/entities/category.entity';
import { Event } from '../../../database/entities/event.entity';
import { Judges } from '../../../database/entities/judges.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryItemDto {
  @IsNotEmpty()
  @ApiProperty()
  category: Category;

  @ApiProperty()
  judges: Judges[];

  @IsNotEmpty()
  @ApiProperty()
  event: Event;
}
