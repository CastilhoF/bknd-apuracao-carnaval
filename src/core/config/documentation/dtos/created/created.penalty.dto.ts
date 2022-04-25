import { ApiProperty } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';
import { EventDto } from '../single-objects/event';
import { SchoolDto } from '../single-objects/school';

export class CreatedPenaltyDto {
  @ApiProperty()
  id: UUIDVersion;

  @ApiProperty()
  value: string;

  @ApiProperty()
  school: SchoolDto;

  @ApiProperty()
  event: EventDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
