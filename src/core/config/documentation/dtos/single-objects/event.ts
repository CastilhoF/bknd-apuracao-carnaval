import { ApiProperty } from '@nestjs/swagger';
import { CategoryItemDto } from './category.item';
import { NotesDto } from './notes';
import { PenaltyDto } from './penalty';

export class EventDto {
  @ApiProperty()
  id: string;

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
