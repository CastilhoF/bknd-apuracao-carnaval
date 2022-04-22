import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../../../../database/entities/category.entity';
import { Judges } from '../../../../../database/entities/judges.entity';

export class CreatedCategoryItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  category: Category;

  @ApiProperty()
  judges: Judges[];

  @ApiProperty()
  event: Event;
}
