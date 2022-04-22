import { ApiProperty } from '@nestjs/swagger';
import { CategoryItemDto } from './category.item';
import { NotesDto } from './notes';
import { PenaltyDto } from './penalty';

export class EventDto {
  @ApiProperty({
    description: 'Event ID',
    example: '5f3b8f8f-f8f8-4f8f-8f8f-8f8f8f8f8f8f',
  })
  id: string;

  @ApiProperty({
    description: 'Event Name',
    example: 'Carnaval 2022',
  })
  name: string;

  @ApiProperty({
    description: 'City where the event will take place',
    example: 'São Paulo',
  })
  city: string;

  @ApiProperty({
    description: 'Year of event',
    example: '2022',
  })
  year: number;

  @ApiProperty({
    description: 'Number of champion',
    example: '1',
  })
  champions: number;

  @ApiProperty({
    description: 'Number of demotes',
    example: '1',
  })
  demotes: number;

  @ApiProperty({
    description: 'Discard minimum grade',
    example: '1',
  })
  discard_min: boolean;

  @ApiProperty({
    description: 'Discard maximum grade',
    example: '1',
  })
  discard_max: boolean;

  @ApiProperty({
    description: 'Created date',
    example: '2020-08-20T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Updated date',
    example: '2020-08-20T00:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Array os Notes',
  })
  notes: NotesDto[];

  @ApiProperty({
    description: 'Array of Category Items',
  })
  categoryItem: CategoryItemDto[];

  @ApiProperty({
    description: 'Array of Penalties',
  })
  penalties: PenaltyDto[];
}
