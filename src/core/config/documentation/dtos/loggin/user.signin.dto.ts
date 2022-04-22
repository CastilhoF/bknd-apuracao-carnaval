import { ApiProperty } from '@nestjs/swagger';

export class UserSignInResponseDto {
  @ApiProperty()
  accessToken: string;
}
