import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupService } from '../service/groups.service';
import { GroupRepository } from '../../../database/repositories/groups.repository';
import { UserModule } from '../../../modules/user/module/user.module';
import { GroupController } from '../controller/groups.controller';
import { EventRepository } from 'src/database/repositories/event.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupRepository, EventRepository]),
    UserModule,
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
