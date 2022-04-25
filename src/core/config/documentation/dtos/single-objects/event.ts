import { ApiProperty } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';
import { CategoryItemDto } from './category.item';
import { NotesDto } from './notes';
import { PenaltyDto } from './penalty';

export class EventDto {
  @ApiProperty()
  id: UUIDVersion;

  @ApiProperty()
  name: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  champions: number;

  @ApiProperty()
  demotes: number;

  @ApiProperty()
  discard_min: boolean;

  @ApiProperty()
  discard_max: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  notes: NotesDto[];

  @ApiProperty()
  categoryItem: CategoryItemDto[];

  @ApiProperty()
  penalties: PenaltyDto[];
}
