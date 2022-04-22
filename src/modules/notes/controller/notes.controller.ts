import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpStatus,
  Res,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../user/decorators/get.user.decorator';
import { User } from '../../../database/entities/user.entity';
import { Notes } from '../../../database/entities/notes.entity';
import { NotesService } from '../service/notes.service';
import { Logger } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateNoteDto } from '../dtos/create.note.dto';

@Controller('notes')
@ApiTags('Notes')
@UseGuards(AuthGuard())
export class NotesController {
  private logger = new Logger('NotesController');

  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiBody({ type: CreateNoteDto })
  async createNote(
    @Body() createNoteDto: Notes,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Notes> {
    this.logger.verbose(
      `User "${user.username}" creating a note. Data: ${JSON.stringify(
        createNoteDto,
      )}`,
    );
    res.status(HttpStatus.CREATED);
    return this.notesService.createNote(createNoteDto);
  }

  @Get()
  async findAllNotes(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
  ): Promise<Notes[]> {
    this.logger.verbose(`User "${user.username}" retrieving all notes.`);
    res.status(HttpStatus.OK);
    return this.notesService.findAllNotes();
  }

  @Get(':id')
  async findOneNote(
    @Param('id') id: string,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Notes> {
    this.logger.verbose(
      `User "${user.username}" retrieving note with ID "${id}".`,
    );
    res.status(HttpStatus.OK);
    return this.notesService.findOneNote(id);
  }

  @Put(':id')
  async updateNote(
    @Param('id') id: string,
    @Body() createNoteDto: Notes,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Notes> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating note with ID "${id}". Data: ${JSON.stringify(createNoteDto)}`,
    );
    res.status(HttpStatus.OK);
    return this.notesService.updateNote(id, createNoteDto);
  }

  @Delete(':id')
  async deleteNote(
    @Param('id') id: string,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting note with ID "${id}".`,
    );
    res.status(HttpStatus.NO_CONTENT);
    return this.notesService.deleteNote(id);
  }
}
