import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from '../../../database/entities/notes.entity';
import { CreateNoteDto } from '../dtos/create.note.dto';
import { NotesRepository } from '../../../database/repositories/notes.repository';
import { UUIDVersion } from 'class-validator';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(NotesRepository)
    private readonly notesRepository: NotesRepository,
  ) {}

  async createNote(createNoteDto: CreateNoteDto): Promise<Notes> {
    return this.notesRepository.createNote(createNoteDto);
  }

  async findAllNotes(): Promise<Notes[]> {
    return this.notesRepository.findAllNotes();
  }

  async findOneNote(id: UUIDVersion): Promise<Notes> {
    const note = await this.notesRepository.findOneNote(id);
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    return note;
  }

  async updateNote(
    id: UUIDVersion,
    createNoteDto: CreateNoteDto,
  ): Promise<Notes> {
    const note = await this.notesRepository.updateNote(id, createNoteDto);
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    return note;
  }

  async deleteNote(id: UUIDVersion): Promise<void> {
    const note = await this.notesRepository.deleteNote(id);
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
  }
}
