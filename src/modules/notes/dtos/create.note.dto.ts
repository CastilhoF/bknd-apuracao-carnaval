import { IsNotEmpty } from 'class-validator';
import { Event } from '../../../database/entities/event.entity';
import { Judges } from '../../../database/entities/judges.entity';
import { Category } from '../../../database/entities/category.entity';
import { Schools } from '../../../database/entities/schools.entity';

export class CreateNoteDto {
  @IsNotEmpty()
  judge: Judges;

  @IsNotEmpty()
  school: Schools;

  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  event: Event;

  @IsNotEmpty()
  value: number;
}
