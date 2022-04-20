import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../../../modules/user/module/user.module';
import { Penalties } from '../../../database/entities/penalties.entity';
import { PenaltiesController } from '../controller/penalties.controller';
import { PenaltiesRepository } from '../../../database/repositories/penalties.repository';
import { PenaltiesService } from '../service/penalties.service';
import { Schools } from 'src/database/entities/schools.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Penalties, Schools, PenaltiesRepository]),
    UserModule,
  ],
  controllers: [PenaltiesController],
  providers: [PenaltiesService],
})
export class PenaltiesModule {}
