import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserCredentialsDto } from 'src/modules/user/dtos/user.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FormatDateAndTime } from '../../utils/format.date';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(UserCredentialsDto: UserCredentialsDto): Promise<void> {
    const { username, password } = UserCredentialsDto;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const date = new Date();

    const createdAt = FormatDateAndTime(date);
    const updatedAt = FormatDateAndTime(date);

    const user = this.create({
      username,
      password: hashedPassword,
      createdAt,
      updatedAt,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
