import { IsNotEmpty } from 'class-validator';

export class CreateSchoolsDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  city_name: string;
}
