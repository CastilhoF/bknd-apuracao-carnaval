import { ApiProperty } from '@nestjs/swagger';
import { SchoolDto } from './school';

export class PenaltyDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  school: SchoolDto;

  @ApiProperty()
  valeu: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
