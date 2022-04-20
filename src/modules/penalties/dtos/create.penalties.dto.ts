import { IsNotEmpty } from 'class-validator';
import { Schools } from 'src/database/entities/schools.entity';

export class CreatePenaltiesDto {
  @IsNotEmpty()
  school: Schools;

  @IsNotEmpty()
  value: number;
}
