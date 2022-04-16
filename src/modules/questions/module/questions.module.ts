import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsService } from '../service/questions.service';
import { QuestionsRepository } from '../../../database/repositories/question.repository';
import { UserModule } from '../../../modules/user/module/user.module';
import { QuestionsController } from '../controller/questions.controller';
import { JudgesRepository } from 'src/database/repositories/judges.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionsRepository, JudgesRepository]),
    UserModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
