import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserCredentialsDto } from '../dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signUp(@Body() userCredentialsDto: UserCredentialsDto) {
    return this.userService.signUp(userCredentialsDto);
  }

  @Post('signin')
  async signIn(@Body() userCredentials: UserCredentialsDto) {
    return this.userService.signIn(userCredentials);
  }
}
