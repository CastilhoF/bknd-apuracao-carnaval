import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({
    description: 'Category ID',
    example: '5f3b8f8f-f8f8-4f8f-8f8f-8f8f8f8f8f8f',
  })
  id: string;

  @ApiProperty({
    description: 'Category Name',
    example: 'Bateria',
  })
  name: string;

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
}
