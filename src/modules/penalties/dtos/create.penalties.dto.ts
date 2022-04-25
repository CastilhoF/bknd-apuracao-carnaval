import { IsNotEmpty, IsNumberString } from 'class-validator';
import { Schools } from '../../../database/entities/schools.entity';
import { Event } from '../../../database/entities/event.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePenaltiesDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Event object payload',
  })
  event: Event;

  @IsNotEmpty()
  @ApiProperty({
    description: 'School object payload',
  })
  school: Schools;

  @IsNumberString()
  @ApiProperty({
    description: 'Penalty value',
    example: ` "1" `,
  })
  value: string;
}
