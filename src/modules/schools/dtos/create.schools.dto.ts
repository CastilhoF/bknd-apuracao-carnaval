import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateSchoolsDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'School name',
    example: `Gaviões da Fiel`,
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'School city',
    example: `São Paulo`,
  })
  city: string;
}
