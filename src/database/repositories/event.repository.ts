import {
  EntityRepository,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { Event } from '../entities/event.entity';
import { CreateEventDto } from '../../modules/event/dtos/create.event.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FormatDateAndTime } from '../../utils/format.date';
import { Logger } from '@nestjs/common';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  private logger = new Logger('EventRepository');

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const { name, city, year, champions, demotes, discard_min, discard_max } =
      createEventDto;

    const date = new Date();

    const createdAt = FormatDateAndTime(date);

    const updatedAt = FormatDateAndTime(date);

    const event = this.create({
      name,
      city,
      year,
      champions,
      demotes,
      discard_min,
      discard_max,
      createdAt,
      updatedAt,
    });

    try {
      return await this.save(event);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Event name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAllEvents(): Promise<Event[]> {
    const findOneOptions: FindManyOptions = {
      relations: [
        'notes',
        'notes.judge',
        'notes.school',
        'notes.category',
        'categoryItem',
        'categoryItem.category',
        'categoryItem.judges',
        'penalties',
        'penalties.school',
      ],
    };
    return await this.find(findOneOptions);
  }

  async findOneEvent(id: string): Promise<Event> {
    try {
      const found = await this.findOne(id);
      if (!found) {
        this.logger.error(`Event id "${id}" not found.`);
        throw new NotFoundException(`Event with ID "${id}" not found`);
      }
      return found;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async updateEvent(
    id: string,
    createEventDto: CreateEventDto,
  ): Promise<Event> {
    const { name, city, year, champions, demotes, discard_min, discard_max } =
      createEventDto;

    const date = new Date();

    const updatedAt = FormatDateAndTime(date);

    const event = await this.findOne(id);

    if (!event) {
      this.logger.error(`Event id "${id}" not found.`);
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }

    event.name = name;
    event.city = city;
    event.year = year;
    event.champions = champions;
    event.demotes = demotes;
    event.discard_min = discard_min;
    event.discard_max = discard_max;
    event.updatedAt = updatedAt;

    try {
      return await this.save(event);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteEvent(id: string): Promise<void> {
    const event = await this.findOne(id);

    if (!event) {
      this.logger.error(`Event id "${id}" not found.`);
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }

    await this.delete(event);
  }
}
