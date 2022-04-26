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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateNoteDto } from '../dtos/create.note.dto';
import { NotesDto } from '../../../core/config/documentation/dtos/single-objects/notes';
import { CreatedNoteDto } from '../../../core/config/documentation/dtos/created/created.notes.dto';
import { UUIDVersion } from 'class-validator';

@ApiBearerAuth()
@Controller('notes')
@ApiTags('Notes')
@UseGuards(AuthGuard())
export class NotesController {
  private logger = new Logger('NotesController');

  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiBody({ type: CreateNoteDto })
  @ApiOperation({ summary: 'Create Note' })
  @ApiCreatedResponse({
    description: `Note created as successfully`,
    type: CreatedNoteDto,
  })
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
  @ApiOperation({ summary: 'Get all notes' })
  @ApiOkResponse({
    description: 'All notes',
    type: [NotesDto],
  })
  async findAllNotes(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
  ): Promise<Notes[]> {
    this.logger.verbose(`User "${user.username}" retrieving all notes.`);
    res.status(HttpStatus.OK);
    return this.notesService.findAllNotes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a note by id' })
  @ApiOkResponse({
    description: 'The note',
    type: NotesDto,
  })
  async findOneNote(
    @Param('id') id: UUIDVersion,
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
  @ApiBody({ type: NotesDto })
  @ApiOperation({ summary: 'Update a note by id' })
  @ApiOkResponse({
    description: 'Note updated successfully',
    type: NotesDto,
  })
  async updateNote(
    @Param('id') id: UUIDVersion,
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
  @ApiOperation({ summary: 'Delete a note by id' })
  @ApiNoContentResponse({ description: 'Note deleted successfully' })
  async deleteNote(
    @Param('id') id: UUIDVersion,
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
