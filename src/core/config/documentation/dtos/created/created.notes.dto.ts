import { ApiProperty } from '@nestjs/swagger';
import { EventDto } from '../single-objects/event';
import { JudgeDto } from '../single-objects/judge';
import { SchoolDto } from '../single-objects/school';

export class CreatedNoteDto {
  @ApiProperty()
  id: string;

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
