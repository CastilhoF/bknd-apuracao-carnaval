import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The category name.',
    example: 'Samba Enredo',
  })
  name: string;
}
