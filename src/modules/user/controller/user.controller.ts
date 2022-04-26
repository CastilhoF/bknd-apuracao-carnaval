import { Body, Controller, Post, HttpStatus, Res } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserCredentialsDto } from '../dtos/user.dto';
import { Response } from 'express';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserSignInResponseDto } from '../../../core/config/documentation/dtos/loggin/user.signin.dto';

@ApiBearerAuth()
@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @ApiBody({ type: UserCredentialsDto })
  @ApiCreatedResponse({
    description: 'User created',
  })
  @ApiOperation({ summary: 'Create user profile' })
  signUp(
    @Res({ passthrough: true }) res: Response,
    @Body() userCredentialsDto: UserCredentialsDto,
  ) {
    res.status(HttpStatus.CREATED);
    return this.userService.signUp(userCredentialsDto);
  }

  @Post('signin')
  @ApiBody({ type: UserCredentialsDto })
  @ApiOperation({ summary: 'Login use user credentials' })
  @ApiOkResponse({
    description: 'User logged in',
    type: UserSignInResponseDto,
  })
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() userCredentials: UserCredentialsDto,
  ) {
    res.status(HttpStatus.OK);
    return this.userService.signIn(userCredentials);
  }
}
