import { ApiProperty } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';

export class CreatedCategoryDto {
  @ApiProperty()
  id: UUIDVersion;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
