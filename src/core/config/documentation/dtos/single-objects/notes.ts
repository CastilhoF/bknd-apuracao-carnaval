import { ApiProperty } from '@nestjs/swagger';
import { EventDto } from './event';
import { SchoolDto } from './school';
import { CategoryDto } from './category';
import { JudgeDto } from './judge';
import { UUIDVersion } from 'class-validator';

export class NotesDto {
  @ApiProperty()
  id: UUIDVersion;

  @ApiProperty()
  event: EventDto;

  @ApiProperty()
  school: SchoolDto;

  @ApiProperty()
  category: CategoryDto;

  @ApiProperty()
  judge: JudgeDto;

  @ApiProperty()
  value: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
