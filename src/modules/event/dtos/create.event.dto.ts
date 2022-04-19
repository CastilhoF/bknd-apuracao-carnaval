import { IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  city_name: string;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  champions: number;

  @IsNotEmpty()
  demotes: number;

  @IsNotEmpty()
  discard_min: boolean;

  @IsNotEmpty()
  discard_max: boolean;
}
