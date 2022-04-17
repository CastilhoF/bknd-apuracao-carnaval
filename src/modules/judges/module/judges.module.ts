import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JudgesService } from '../service/judges.service';
import { JudgesRepository } from '../../../database/repositories/judges.repository';
import { UserModule } from '../../../modules/user/module/user.module';
import { JudgesController } from '../controller/judges.controller';
import { QuestionsRepository } from '../../../database/repositories/question.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([JudgesRepository, QuestionsRepository]),
    UserModule,
  ],
  controllers: [JudgesController],
  providers: [JudgesService],
})
export class JudgesModule {}
