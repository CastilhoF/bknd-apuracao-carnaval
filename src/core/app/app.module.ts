import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../../modules/user/module/user.module';
import { configEnvironmentsValidation } from '../config/validations/config.env.validation';
import { TypeOrmConfig } from '../config/database/typeorm.config';
import { EventModule } from '../../modules/event/module/event.module';
import { GroupModule } from '../../modules/groups/module/groups.module';
import { SchoolsModule } from '../../modules/schools/module/schools.module';
import { JudgesModule } from '../../modules/judges/module/judges.module';
import { QuestionsModule } from '../../modules/questions/module/questions.module';
import { VerificationModule } from '../../modules/verification/module/verification.module';

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
    SchoolsModule,
    JudgesModule,
    QuestionsModule,
    VerificationModule,
  ],
})
export class AppModule {}
