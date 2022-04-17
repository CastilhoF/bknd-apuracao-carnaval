import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateVerificationDto {
  @IsNotEmpty()
  judge_name: string;

  @IsNotEmpty()
  question_name: string;

  @IsNotEmpty()
  school_name: string;

  @IsNotEmpty()
  group_name: string;

  @IsNotEmpty()
  event_name: string;

  @IsInt()
  @IsNotEmpty()
  note_value: number;
}
