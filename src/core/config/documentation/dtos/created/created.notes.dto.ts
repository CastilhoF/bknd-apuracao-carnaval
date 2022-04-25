import { ApiProperty } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';
import { EventDto } from '../single-objects/event';
import { JudgeDto } from '../single-objects/judge';
import { SchoolDto } from '../single-objects/school';

export class CreatedNoteDto {
  @ApiProperty()
  id: UUIDVersion;

  @ApiProperty()
  value: string;

  @ApiProperty()
  judge: JudgeDto;

  @ApiProperty()
  school: SchoolDto;

  @ApiProperty()
  event: EventDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
