import { ApiProperty } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';
import { SchoolDto } from './school';

export class PenaltyDto {
  @ApiProperty()
  id: UUIDVersion;

  @ApiProperty()
  school: SchoolDto;

  @ApiProperty()
  valeu: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
