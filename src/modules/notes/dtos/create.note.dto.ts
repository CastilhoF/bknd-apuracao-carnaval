import { IsNotEmpty, IsNumberString } from 'class-validator';
import { Event } from '../../../database/entities/event.entity';
import { Judges } from '../../../database/entities/judges.entity';
import { Category } from '../../../database/entities/category.entity';
import { Schools } from '../../../database/entities/schools.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Judge object payload',
  })
  judge: Judges;

  @IsNotEmpty()
  @ApiProperty({
    description: 'School object payload',
  })
  school: Schools;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Category object payload',
  })
  category: Category;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Event object payload',
  })
  event: Event;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({
    description: 'Note value',
    example: ` "1"`,
  })
  value: string;
}
