import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsNotEmpty()
  @ApiProperty()
  year: number;

  @IsNotEmpty()
  @ApiProperty()
  champions: number;

  @IsNotEmpty()
  @ApiProperty()
  demotes: number;

  @IsNotEmpty()
  @ApiProperty()
  discard_min: boolean;

  @IsNotEmpty()
  @ApiProperty()
  discard_max: boolean;
}
