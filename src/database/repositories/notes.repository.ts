import { EntityRepository, Repository } from 'typeorm';
import { Schools } from '../entities/schools.entity';
import { Notes } from '../entities/notes.entity';
import { CreateNoteDto } from 'src/modules/notes/dtos/create.note.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FormatDateAndTime } from '../../utils/format.date';
import { Logger } from '@nestjs/common';

@EntityRepository(Notes)
export class NotesRepository extends Repository<Notes> {
  private logger = new Logger('NotesRepository');

  async createNote(createNoteDto: CreateNoteDto): Promise<Notes> {
    const { judge, school, category, event, value } = createNoteDto;

    const date = new Date();

    const createdAt = FormatDateAndTime(date);

    const updatedAt = FormatDateAndTime(date);

    const note = this.create({
      judge,
      school,
      category,
      event,
      createdAt,
      updatedAt,
      value,
    });

    try {
      return await this.save(note);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAllNotes(): Promise<Notes[]> {
    return await this.find();
  }

  async findOneNote(id: string): Promise<Notes> {
    try {
      const found = await this.findOne(id);
      if (!found) {
        this.logger.error(`Notes id "${id}" not found.`);
        throw new NotFoundException(`Notes with ID "${id}" not found`);
      }
      return found;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async updateNote(id: string, createNoteDto: CreateNoteDto): Promise<Notes> {
    const { judge, school, category, event, value } = createNoteDto;

    const date = new Date();

    const updatedAt = FormatDateAndTime(date);

    if (!id) {
      this.logger.error(`Note id "${id}" not found.`);
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }

    const note = await this.findOne(id);

    if (!note) {
      this.logger.error(`Note id "${id}" not found.`);
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }

    note.judge = judge;
    note.school = school;
    note.category = category;
    note.event = event;
    note.updatedAt = updatedAt;
    note.value = value;

    try {
      return await this.save(note);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteNote(id: string): Promise<Notes> {
    const note = await this.findOne(id);

    if (!note) {
      this.logger.error(`Note id "${id}" not found.`);
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }

    try {
      return await this.remove(note);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
