import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../user/decorators/get.user.decorator';
import { CreateEventDto } from '../dtos/create.event.dto';
import { User } from 'src/database/entities/user.entity';
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
}
