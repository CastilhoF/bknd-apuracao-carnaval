import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../database/entities/event.entity';
import { CreateEventDto } from '../dtos/create.event.dto';
import { EventRepository } from '../../../database/repositories/event.repository';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    return this.eventRepository.createEvent(createEventDto);
  }

  async findAllEvents(): Promise<Event[]> {
    return this.eventRepository.findAllEvents();
  }
}
