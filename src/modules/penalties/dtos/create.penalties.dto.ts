import { IsNotEmpty, IsNumberString } from 'class-validator';
import { Schools } from '../../../database/entities/schools.entity';
import { Event } from '../../../database/entities/event.entity';

export class CreatePenaltiesDto {
  @IsNotEmpty()
  event: Event;

  @IsNotEmpty()
  school: Schools;

  @IsNumberString()
  value: number;
}
