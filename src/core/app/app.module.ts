import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/modules/user/module/user.module';
import { configEnvironmentsValidation } from '../config/validations/config.env.validation';
import { TypeOrmConfig } from '../config/database/typeorm.config';
import { EventModule } from 'src/modules/event/module/event.module';
import { GroupModule } from 'src/modules/groups/module/groups.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.stage.${process.env.STAGE}.env`],
      validationSchema: configEnvironmentsValidation,
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfig),
    UserModule,
    EventModule,
    GroupModule,
  ],
})
export class AppModule {}
