import { ApiProperty } from '@nestjs/swagger';
import { JudgeDto } from './judge';
import { EventDto } from './event';
import { CategoryDto } from './category';

export class CategoryItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  category: CategoryDto;

  @ApiProperty()
  judges: JudgeDto[];

  @ApiProperty()
  event: EventDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
