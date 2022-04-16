import { IsNotEmpty } from 'class-validator';

export class CreateJudgesDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  question_id: string;
}
