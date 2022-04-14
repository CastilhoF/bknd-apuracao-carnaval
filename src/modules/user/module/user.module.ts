import { Module } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserController } from '../controller/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../../../database/repositories/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../auth/strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES'),
          },
        };
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
