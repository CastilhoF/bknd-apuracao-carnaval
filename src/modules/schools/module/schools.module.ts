import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolsService } from '../service/schools.service';
import { SchoolsRepository } from '../../../database/repositories/schools.repository';
import { UserModule } from '../../../modules/user/module/user.module';
import { SchoolsController } from '../controller/schools.controller';
import { GroupRepository } from 'src/database/repositories/groups.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SchoolsRepository, GroupRepository]),
    UserModule,
  ],
  controllers: [SchoolsController],
  providers: [SchoolsService],
})
export class SchoolsModule {}
