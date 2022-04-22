import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpStatus,
  Res,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../user/decorators/get.user.decorator';
import { CreateEventDto } from '../dtos/create.event.dto';
import { User } from '../../../database/entities/user.entity';
import { Event } from '../../../database/entities/event.entity';
import { EventService } from '../service/event.service';
import { Logger } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreatedEventDto } from '../../../core/config/documentation/dtos/created/created.event.dto';
import { EventDto } from '../../../core/config/documentation/dtos/single-objects/event';

@Controller('events')
@ApiTags('Events')
export class EventController {
  private logger = new Logger('EventController');

  constructor(private eventService: EventService) {}

  @Post()
  @ApiBody({ type: CreateEventDto })
  @ApiOperation({ summary: 'Create Events. Ex. (Carnivals)' })
  @ApiCreatedResponse({
    description: `User "USERNAME" create a new event. Event: { Created Event Dto }`,
    type: CreatedEventDto,
  })
  @UseGuards(AuthGuard())
  createEvent(
    @Body() createEventDto: CreateEventDto,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Event> {
    this.logger.verbose(
      `User "${user.username}" create a new event. Event: ${JSON.stringify(
        createEventDto,
      )}`,
    );
    res.status(HttpStatus.CREATED);
    return this.eventService.createEvent(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All Events' })
  @ApiOkResponse({
    description: 'Successfully',
    type: [EventDto],
  })
  findAllEvents(
    @Res({ passthrough: true }) res: Response,
    // @GetUser() user: User,
  ): Promise<Event[]> {
    // this.logger.verbose(`User "${user.username}" find all events.`);
    res.status(HttpStatus.OK);
    return this.eventService.findAllEvents();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Event By ID' })
  @ApiOkResponse({ description: 'Successfully', type: EventDto })
  findOneEvent(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
    // @GetUser() user: User,
  ): Promise<Event> {
    // this.logger.verbose(`User "${user.username}" find one event id: ${id}`);
    res.status(HttpStatus.OK);
    return this.eventService.findOneEvent(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Event By ID' })
  @ApiOkResponse({ description: 'Event Updated Successfully', type: EventDto })
  @UseGuards(AuthGuard())
  updateEvent(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() createEventDto: CreateEventDto,
  ): Promise<Event> {
    this.logger.verbose(`User "${user.username}" update event id: ${id}`);
    res.status(HttpStatus.OK);
    return this.eventService.updateEvent(id, createEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Event By ID' })
  @ApiNoContentResponse({ description: 'Event Deleted Successfully' })
  @UseGuards(AuthGuard())
  deleteEvent(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    this.logger.verbose(`User "${user.username}" delete event id: ${id}`);
    res.status(HttpStatus.NO_CONTENT);
    return this.eventService.deleteEvent(id);
  }
}
