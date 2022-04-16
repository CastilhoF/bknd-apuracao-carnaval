import { IsNotEmpty } from 'class-validator';

export class CreateSchoolsDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  group_id: string;
}
