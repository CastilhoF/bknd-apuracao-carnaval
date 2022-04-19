import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { Notes } from '../entities/notes.entity';
import { CreateNoteDto } from 'src/modules/notes/dtos/create.note.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
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

    if (!judge) {
      throw new BadRequestException('Judge are required');
    }

    if (!school) {
      throw new BadRequestException('School are required');
    }

    if (!category) {
      throw new BadRequestException('Category are required');
    }

    if (!event) {
      throw new BadRequestException('Event are required');
    }

    if (!value) {
      throw new BadRequestException('Value are required');
    }

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
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Judges name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAllNotes(): Promise<Notes[]> {
    const findOptions: FindManyOptions = {
      relations: ['judge', 'school', 'category', 'event'],
    };
    return await this.find(findOptions);
  }

  async findOneNote(id: string): Promise<Notes> {
    try {
      const findOptions = {
        relations: ['judge', 'school', 'category', 'event'],
        where: { id },
      };
      const found = await this.findOne(findOptions);
      if (!found) {
        this.logger.error(`Notes id "${id}" not found.`);
        throw new BadRequestException(`Notes with ID "${id}" not found`);
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
