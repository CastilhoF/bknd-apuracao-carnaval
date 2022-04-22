import { ApiProperty } from '@nestjs/swagger';

export class GetAllEventsResponseDto {
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
  notes: [];

  @ApiProperty()
  categoryItem: [];

  @ApiProperty()
  penalties: [];
}
