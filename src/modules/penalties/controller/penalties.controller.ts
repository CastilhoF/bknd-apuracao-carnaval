import {
  Body,
  Delete,
  Get,
  Param,
  Post,
  HttpStatus,
  Res,
  Put,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../user/decorators/get.user.decorator';
import { User } from '../../../database/entities/user.entity';
import { CreatePenaltiesDto } from '../dtos/create.penalties.dto';
import { Penalties } from '../../../database/entities/penalties.entity';
import { Logger } from '@nestjs/common';
import { PenaltiesService } from '../service/penalties.service';
import { Response } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('penalties')
@ApiTags('Penalties')
@UseGuards(AuthGuard())
export class PenaltiesController {
  private logger = new Logger('PenaltiesController');

  constructor(private readonly penaltiesService: PenaltiesService) {}

  @Post()
  @ApiBody({ type: CreatePenaltiesDto })
  createPenalties(
    @Body() createPenaltiesDto: CreatePenaltiesDto,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Penalties> {
    this.logger.verbose(
      `User "${user.username}" creating a new penalties. Data: ${JSON.stringify(
        createPenaltiesDto,
      )}`,
    );
    res.status(HttpStatus.CREATED);
    return this.penaltiesService.createPenalties(createPenaltiesDto);
  }

  @Get()
  findAllPenalties(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Penalties[]> {
    this.logger.verbose(`User "${user.username}" retrieving all penalties.`);
    res.status(HttpStatus.OK);
    return this.penaltiesService.findAllPenalties();
  }

  @Get('/:id')
  findOnePenalties(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Penalties> {
    this.logger.verbose(
      `User "${user.username}" retrieving penalties "${id}".`,
    );
    res.status(HttpStatus.OK);
    return this.penaltiesService.findOnePenalties(id);
  }

  @Put('/:id')
  updatePenalties(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() createPenaltiesDto: CreatePenaltiesDto,
  ): Promise<Penalties> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating penalties "${id}". Data: ${JSON.stringify(
        createPenaltiesDto,
      )}`,
    );
    res.status(HttpStatus.OK);
    return this.penaltiesService.updatePenalties(id, createPenaltiesDto);
  }

  @Delete('/:id')
  deletePenalties(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    this.logger.verbose(`User "${user.username}" deleting penalties "${id}".`);
    res.status(HttpStatus.NO_CONTENT);
    return this.penaltiesService.deletePenalties(id);
  }
}
