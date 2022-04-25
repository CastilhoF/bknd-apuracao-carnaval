import { ApiProperty } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';

export class CreatedEventDto {
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
  discard_min: number;

  @ApiProperty()
  discard_max: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
