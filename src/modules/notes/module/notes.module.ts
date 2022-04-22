import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesService } from '../service/notes.service';
import { UserModule } from '../../../modules/user/module/user.module';
import { NotesRepository } from '../../../database/repositories/notes.repository';
import { NotesController } from '../controller/notes.controller';
import { EventRepository } from '../../../database/repositories/event.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotesRepository]),
    UserModule,
    EventRepository,
  ],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
