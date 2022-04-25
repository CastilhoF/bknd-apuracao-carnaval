import { ApiProperty } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';

export class SchoolDto {
  @ApiProperty()
  id: UUIDVersion;

  @ApiProperty()
  name: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
