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

  async findOneEvent(id: string): Promise<Event> {
    const found = await this.eventRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    return found;
  }

  async updateEvent(
    id: string,
    createEventDto: CreateEventDto,
  ): Promise<Event> {
    return this.eventRepository.updateEvent(id, createEventDto);
  }

  async deleteEvent(id: string): Promise<void> {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    await this.eventRepository.delete(id);
  }
}