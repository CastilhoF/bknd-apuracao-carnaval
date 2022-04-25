import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJudgesDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The judge name.',
    example: 'Fernando Castilho',
  })
  name: string;
}
