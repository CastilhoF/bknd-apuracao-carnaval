import { IsNotEmpty } from 'class-validator';
import { Event } from '../../../database/entities/event.entity';
import { Judges } from '../../../database/entities/judges.entity';
import { Category } from '../../../database/entities/category.entity';
import { Schools } from '../../../database/entities/schools.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @IsNotEmpty()
  @ApiProperty()
  judge: Judges;

  @IsNotEmpty()
  @ApiProperty()
  school: Schools;

  @IsNotEmpty()
  @ApiProperty()
  category: Category;

  @IsNotEmpty()
  @ApiProperty()
  event: Event;

  @IsNotEmpty()
  @ApiProperty()
  value: number;
}
