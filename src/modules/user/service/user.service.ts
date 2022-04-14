import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialsDto } from '../dtos/user.dto';
import { UserRepository } from '../../../database/repositories/user.repository';
import { JwtPayload } from '../../auth/interfaces/jwt.payload.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userCredentials: UserCredentialsDto): Promise<void> {
    return this.userRepository.createUser(userCredentials);
  }

  async signIn(
    userCredetialsDto: UserCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = userCredetialsDto;
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check yout login credentials');
    }
  }
}
