import { IsNotEmpty } from 'class-validator';
import { Category } from '../../../database/entities/category.entity';
import { Event } from '../../../database/entities/event.entity';
import { Judges } from '../../../database/entities/judges.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryItemDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The category payload object.',
    example: 'CategoryDto',
  })
  category: Category;

  @ApiPropertyOptional({
    description: 'The array of judges payload object.',
    example: ['JudgeDto'],
  })
  judges: Judges[];

  @IsNotEmpty()
  @ApiProperty({
    description: 'The event payload object.',
    example: 'EventDto',
  })
  event: Event;
}
