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
import { PenaltyDto } from '../../../core/config/documentation/dtos/single-objects/penalty';
import { Penalties } from '../../../database/entities/penalties.entity';
import { Logger } from '@nestjs/common';
import { PenaltiesService } from '../service/penalties.service';
import { Response } from 'express';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreatedPenaltyDto } from '../../../core/config/documentation/dtos/created/created.penalty.dto';

@Controller('penalties')
@ApiTags('Penalties')
@UseGuards(AuthGuard())
export class PenaltiesController {
  private logger = new Logger('PenaltiesController');

  constructor(private readonly penaltiesService: PenaltiesService) {}

  @Post()
  @ApiBody({ type: CreatePenaltiesDto })
  @ApiOperation({ summary: 'Create a new penalty' })
  @ApiCreatedResponse({
    description: `The Penalty as been created`,
    type: CreatedPenaltyDto,
  })
  createPenalties(
    @Body() createPenaltiesDto: CreatePenaltiesDto,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Penalties> {
    this.logger.verbose(
      `User "${
        user.username
      }" creating a new penalty. Penalty: ${JSON.stringify(
        createPenaltiesDto,
      )}`,
    );
    res.status(HttpStatus.CREATED);
    return this.penaltiesService.createPenalties(createPenaltiesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all penalties' })
  @ApiOkResponse({
    description: `User "USERNAME" get all penalties.`,
    type: [PenaltyDto],
  })
  findAllPenalties(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Penalties[]> {
    this.logger.verbose(`User "${user.username}" get all penalties.`);
    res.status(HttpStatus.OK);
    return this.penaltiesService.findAllPenalties();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a penalty' })
  @ApiOkResponse({
    description: `User "USERNAME" get a penalty id: " ID "`,
    type: PenaltyDto,
  })
  findOnePenalties(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<Penalties> {
    this.logger.verbose(`User "${user.username}" get penalty "${id}".`);
    res.status(HttpStatus.OK);
    return this.penaltiesService.findOnePenalties(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update a penalty' })
  @ApiOkResponse({
    description: `User "USERNAME" update penalty id: " ID "`,
    type: PenaltyDto,
  })
  updatePenalties(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() createPenaltiesDto: CreatePenaltiesDto,
  ): Promise<Penalties> {
    this.logger.verbose(`User "${user.username}" update penalty id: "${id}".`);
    res.status(HttpStatus.OK);
    return this.penaltiesService.updatePenalties(id, createPenaltiesDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a penalty by ID' })
  @ApiNoContentResponse({ description: 'Penalty Deleted Successfully' })
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
