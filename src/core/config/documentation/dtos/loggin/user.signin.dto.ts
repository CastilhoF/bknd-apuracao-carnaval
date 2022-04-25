import { ApiProperty } from '@nestjs/swagger';

export class UserSignInResponseDto {
  @ApiProperty({
    description: 'The user generated access token.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjojUwNjYwMzM2LCJleHAiOjE2NTA5NjAzMzZ9.iK6r33EDtOGpDtwTcZY2BqOqqwXIWEUZ3oZLOMGg5NY',
  })
  accessToken: string;
}
