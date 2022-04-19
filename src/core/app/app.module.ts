import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../../modules/user/module/user.module';
import { configEnvironmentsValidation } from '../config/validations/config.env.validation';
import { TypeOrmConfig } from '../config/database/typeorm.config';
import { EventModule } from '../../modules/event/module/event.module';
import { SchoolsModule } from '../../modules/schools/module/schools.module';
import { JudgesModule } from '../../modules/judges/module/judges.module';
import { NotesModule } from 'src/modules/notes/module/notes.module';
import { CategoryModule } from 'src/modules/categories/module/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.stage.${process.env.STAGE}.env`],
      validationSchema: configEnvironmentsValidation,
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfig),
    UserModule,
    EventModule,
    SchoolsModule,
    JudgesModule,
    NotesModule,
    CategoryModule,
  ],
})
export class AppModule {}
