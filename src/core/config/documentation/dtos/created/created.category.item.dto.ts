import { ApiProperty } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';
import { Category } from '../../../../../database/entities/category.entity';
import { Judges } from '../../../../../database/entities/judges.entity';

export class CreatedCategoryItemDto {
  @ApiProperty()
  id: UUIDVersion;

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
