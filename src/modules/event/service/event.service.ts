import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../../database/entities/event.entity';
import { CreateEventDto } from '../dtos/create.event.dto';
import { EventRepository } from '../../../database/repositories/event.repository';
import { UUIDVersion } from 'class-validator';
import { FinishingEventDto } from '../dtos/finishing.event.dto';

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

  async findOneEvent(id: UUIDVersion): Promise<Event> {
    const found = await this.eventRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    return found;
  }

  async updateEvent(
    id: UUIDVersion,
    createEventDto: CreateEventDto,
  ): Promise<Event> {
    return this.eventRepository.updateEvent(id, createEventDto);
  }

  async finishEvent(
    id: UUIDVersion,
    finishing: FinishingEventDto,
  ): Promise<Event> {
    return this.eventRepository.finishingEvent(id, finishing);
  }

  async deleteEvent(id: UUIDVersion): Promise<void> {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    await this.eventRepository.deleteEvent(id);
  }
}
