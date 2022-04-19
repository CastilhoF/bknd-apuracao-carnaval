import { IsNotEmpty } from 'class-validator';
import { Category } from '../../../database/entities/category.entity';
import { Event } from '../../../database/entities/event.entity';
import { Judges } from '../../../database/entities/judges.entity';

export class CreateCategoryItemDto {
  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  judges: Judges[];

  @IsNotEmpty()
  event: Event;
}
