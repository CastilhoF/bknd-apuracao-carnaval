import { ApiProperty } from '@nestjs/swagger';
import { JudgeDto } from './judge';
import { EventDto } from './event';
import { CategoryDto } from './category';
import { UUIDVersion } from 'class-validator';

export class CategoryItemDto {
  @ApiProperty()
  id: UUIDVersion;

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
