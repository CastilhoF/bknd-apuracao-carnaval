import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../user/decorators/get.user.decorator';
import { CreateEventDto } from '../dtos/create.event.dto';
import { User } from '../../../database/entities/user.entity';
import { Event } from '../../../database/entities/event.entity';
import { EventService } from '../service/event.service';
import { Logger } from '@nestjs/common';

@Controller('events')
@UseGuards(AuthGuard())
export class EventController {
  private logger = new Logger('EventController');

  constructor(private eventService: EventService) {}

  @Post()
  createEvent(
    @Body() createEventDto: CreateEventDto,
    @GetUser() user: User,
  ): Promise<Event> {
    this.logger.verbose(
      `User "${user.username}" create a new event. Event: ${JSON.stringify(
        createEventDto,
      )}`,
    );
    return this.eventService.createEvent(createEventDto);
  }

  @Get()
  findAllEvents(@GetUser() user: User): Promise<Event[]> {
    this.logger.verbose(`User "${user.username}" find all events.`);
    return this.eventService.findAllEvents();
  }

  @Get(':id')
  findOneEvent(@Param('id') id: string, @GetUser() user: User): Promise<Event> {
    this.logger.verbose(`User "${user.username}" find one event id: ${id}`);
    return this.eventService.findOneEvent(id);
  }

  @Patch(':id')
  updateEvent(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() createEventDto: CreateEventDto,
  ): Promise<Event> {
    this.logger.verbose(`User "${user.username}" update event id: ${id}`);
    return this.eventService.updateEvent(id, createEventDto);
  }

  @Delete(':id')
  deleteEvent(@GetUser() user: User, @Param('id') id: string): Promise<void> {
    this.logger.verbose(`User "${user.username}" delete event id: ${id}`);
    return this.eventService.deleteEvent(id);
  }
}
