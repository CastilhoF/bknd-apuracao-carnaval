import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JudgesService } from '../service/judges.service';
import { JudgesRepository } from '../../../database/repositories/judges.repository';
import { UserModule } from '../../../modules/user/module/user.module';
import { JudgesController } from '../controller/judges.controller';

@Module({
  imports: [TypeOrmModule.forFeature([JudgesRepository]), UserModule],
  controllers: [JudgesController],
  providers: [JudgesService],
})
export class JudgesModule {}
