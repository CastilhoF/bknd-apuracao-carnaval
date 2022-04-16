import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  question_name: string;

  @IsString()
  judge_one_id: string;

  @IsString()
  judge_two_id: string;

  @IsString()
  judge_tree_id: string;

  @IsString()
  judge_four_id: string;

  @IsString()
  judge_five_id: string;
}
