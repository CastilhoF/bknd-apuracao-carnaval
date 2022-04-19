import { Body, Controller, Post, HttpStatus, Res } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserCredentialsDto } from '../dtos/user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signUp(@Body() userCredentialsDto: UserCredentialsDto) {
    return this.userService.signUp(userCredentialsDto);
  }

  @Post('signin')
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() userCredentials: UserCredentialsDto,
  ) {
    res.status(HttpStatus.OK);
    return this.userService.signIn(userCredentials);
  }
}
