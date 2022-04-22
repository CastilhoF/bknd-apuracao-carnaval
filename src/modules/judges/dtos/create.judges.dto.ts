import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJudgesDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
