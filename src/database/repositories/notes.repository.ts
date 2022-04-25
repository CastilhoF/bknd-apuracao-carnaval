import {
  Connection,
  EntityRepository,
  FindManyOptions,
  Repository,
} from 'typeorm';
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
import { Event } from '../entities/event.entity';
import { Schools } from '../entities/schools.entity';
import { Judges } from '../entities/judges.entity';
import { Category } from '../entities/category.entity';
import { UUIDVersion } from 'class-validator';

@EntityRepository(Notes)
export class NotesRepository extends Repository<Notes> {
  private logger = new Logger('NotesRepository');
  private eventRepository: Repository<Event>;
  private judgesRepository: Repository<Judges>;
  private schoolsRepository: Repository<Schools>;
  private categoryRepository: Repository<Category>;

  constructor(private connection: Connection) {
    super();
    this.eventRepository = connection.getRepository<Event>(Event);
    this.judgesRepository = connection.getRepository<Judges>(Judges);
    this.schoolsRepository = connection.getRepository<Schools>(Schools);
    this.categoryRepository = connection.getRepository<Category>(Category);
  }

  async createNote(createNoteDto: CreateNoteDto): Promise<Notes> {
    const { judge, school, category, event, value } = createNoteDto;

    const date = new Date();

    const createdAt = FormatDateAndTime(date);

    const updatedAt = FormatDateAndTime(date);

    if (!judge) {
      this.logger.error(`Judge id "${judge}" is empty.`);
      throw new BadRequestException('Judge are required');
    } else {
      const judgeIsValid = await this.judgesRepository.findOne(judge.id);
      if (!judgeIsValid) {
        this.logger.error(`Judge id "${judge}" is not valid.`);
        throw new BadRequestException('Judge ID is not valid or not found.');
      }
    }

    if (!school) {
      this.logger.error(`School id "${school}" is empty.`);
      throw new BadRequestException('School are required');
    } else {
      const schoolIsValid = await this.schoolsRepository.findOne(school.id);
      if (!schoolIsValid) {
        this.logger.error(`School id "${school}" is not valid.`);
        throw new BadRequestException('School ID is not valid or not found.');
      }
    }

    if (!category) {
      this.logger.error(`Category id "${category}" is empty.`);
      throw new BadRequestException('Category are required');
    } else {
      const categoryIsValid = await this.categoryRepository.findOne(
        category.id,
      );
      if (!categoryIsValid) {
        this.logger.error(`Category id "${category}" is not valid.`);
        throw new BadRequestException('Category ID is not valid or not found.');
      }
    }

    if (!event) {
      this.logger.error(`Event id "${event}" is empty.`);
      throw new BadRequestException('Event are required');
    } else {
      const eventIsValid = await this.eventRepository.findOne(event.id);
      if (!eventIsValid) {
        this.logger.error(`Event id "${event}" is not valid.`);
        throw new BadRequestException('Event ID is not valid or not found.');
      }
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
        throw new ConflictException({
          message:
            'This judge has already noted a score for this category in this event.',
        });
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAllNotes(): Promise<Notes[]> {
    const findOptions: FindManyOptions = {
      relations: ['judge', 'school', 'category'],
    };
    return await this.find(findOptions);
  }

  async findOneNote(id: UUIDVersion): Promise<Notes> {
    try {
      const findOptions = {
        relations: ['judge', 'school', 'category'],
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

  async updateNote(
    id: UUIDVersion,
    createNoteDto: CreateNoteDto,
  ): Promise<Notes> {
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

  async deleteNote(id: UUIDVersion): Promise<Notes> {
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
