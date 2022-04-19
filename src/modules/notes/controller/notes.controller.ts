import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../user/decorators/get.user.decorator';
import { User } from '../../../database/entities/user.entity';
import { Notes } from '../../../database/entities/notes.entity';
import { NotesService } from '../service/notes.service';
import { Logger } from '@nestjs/common';

@Controller('notes')
@UseGuards(AuthGuard())
export class NotesController {
  private logger = new Logger('NotesController');

  constructor(private readonly notesService: NotesService) {}

  @Post()
  async createNote(
    @Body() createNoteDto: Notes,
    @GetUser() user: User,
  ): Promise<Notes> {
    this.logger.verbose(
      `User "${user.username}" creating a note. Data: ${JSON.stringify(
        createNoteDto,
      )}`,
    );
    return this.notesService.createNote(createNoteDto);
  }

  @Get()
  async findAllNotes(@GetUser() user: User): Promise<Notes[]> {
    this.logger.verbose(`User "${user.username}" retrieving all notes.`);
    return this.notesService.findAllNotes();
  }

  @Get(':id')
  async findOneNote(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Notes> {
    this.logger.verbose(
      `User "${user.username}" retrieving note with ID "${id}".`,
    );
    return this.notesService.findOneNote(id);
  }

  @Patch(':id')
  async updateNote(
    @Param('id') id: string,
    @Body() createNoteDto: Notes,
    @GetUser() user: User,
  ): Promise<Notes> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating note with ID "${id}". Data: ${JSON.stringify(createNoteDto)}`,
    );
    return this.notesService.updateNote(id, createNoteDto);
  }

  @Delete(':id')
  async deleteNote(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting note with ID "${id}".`,
    );
    return this.notesService.deleteNote(id);
  }
}
