import { IsNotEmpty, IsNumberString } from 'class-validator';
import { Schools } from '../../../database/entities/schools.entity';
import { Event } from '../../../database/entities/event.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePenaltiesDto {
  @IsNotEmpty()
  @ApiProperty()
  event: Event;

  @IsNotEmpty()
  @ApiProperty()
  school: Schools;

  @IsNumberString()
  @ApiProperty()
  value: string;
}
