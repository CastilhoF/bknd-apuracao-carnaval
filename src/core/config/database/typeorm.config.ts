import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'mysql',
      host: configService.get('HOST_MYSQL'),
      port: configService.get('PORT_MYSQL'),
      username: configService.get('USER_MYSQL'),
      password: configService.get('PWD_MYSQL'),
      database: configService.get('DB_MYSQL'),
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    };
  },
};

// pra pegar
