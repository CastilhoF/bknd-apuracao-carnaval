import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The event name.',
    example: 'Carnaval 2022',
  })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'City where the event will take place.',
    example: 'São Paulo',
  })
  city: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Year in which the event will take place.',
    example: '2022',
  })
  year: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Number of event champions',
    example: '3',
  })
  champions: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Number of demoted participants',
    example: '2',
  })
  demotes: number;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Discard minimum grade',
    example: 'true',
  })
  discard_min: boolean;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Discard maximum grade',
    example: 'true',
  })
  discard_max: boolean;
}
