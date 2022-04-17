import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationService } from '../service/verification.service';
import { VerificationRepository } from '../../../database/repositories/verification.repository';
import { UserModule } from '../../../modules/user/module/user.module';
import { VerificationController } from '../controller/verification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VerificationRepository]), UserModule],
  controllers: [VerificationController],
  providers: [VerificationService],
})
export class VerificationModule {}
