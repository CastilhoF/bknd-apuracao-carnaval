import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventRepository } from '../../../database/repositories/event.repository';
import { UserModule } from '../../../modules/user/module/user.module';
import { EventController } from '../controller/event.controller';
import { EventService } from '../service/event.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventRepository]), UserModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
