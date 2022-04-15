import { EntityRepository, Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { CreateEventDto } from '../../modules/event/dtos/create.event.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FormatDateAndTime } from 'src/utils/format.date';
import { Logger } from '@nestjs/common';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
  private logger = new Logger('EventRepository');

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const { name, location } = createEventDto;

    const date = new Date();

    const createdAt = FormatDateAndTime(date);

    const updatedAt = FormatDateAndTime(date);

    const event = this.create({ name, location, createdAt, updatedAt });

    try {
      return await this.save(event);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Event name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAllEvents(): Promise<Event[]> {
    return await this.find();
  }

  async updateEvent(
    id: string,
    createEventDto: CreateEventDto,
  ): Promise<Event> {
    const { name, location } = createEventDto;

    const date = new Date();

    const updatedAt = FormatDateAndTime(date);

    if (!id) {
      this.logger.error(`Event id is required.`);
      throw new NotFoundException(`No id provided!`);
    }

    const event = await this.findOne(id);

    if (!event) {
      this.logger.error(`Event id "${id}" not found.`);
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }

    event.name = name;
    event.location = location;
    event.updatedAt = updatedAt;

    return await this.save(event);
  }
}
