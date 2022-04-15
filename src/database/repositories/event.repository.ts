import { EntityRepository, Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { CreateEventDto } from '../../modules/event/dtos/create.event.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FormatDateAndTime } from 'src/utils/format.date';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {
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
}
