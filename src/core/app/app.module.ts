import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configEnvironmentsValidation } from '../config/validations/config.env.validation';
import { TypeOrmConfig } from '../config/database/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.stage.${process.env.STAGE}.env`],
      validationSchema: configEnvironmentsValidation,
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfig),
  ],
})
export class AppModule {}
