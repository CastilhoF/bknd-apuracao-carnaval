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
import { CreateJudgesDto } from '../dtos/create.judges.dto';
import { User } from '../../../database/entities/user.entity';
import { Judges } from '../../../database/entities/judges.entity';
import { JudgesService } from '../service/judges.service';
import { JudgeDto } from '../../../core/config/documentation/dtos/single-objects/judge';
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
import { CreatedJudgeDto } from 'src/core/config/documentation/dtos/created/created.judge.dto';
import { UUIDVersion } from 'class-validator';

@Controller('judges')
@ApiTags('Judges')
@UseGuards(AuthGuard())
export class JudgesController {
  private logger = new Logger('JudgesController');

  constructor(private judgesService: JudgesService) {}

  @Post()
  @ApiBody({ type: CreateJudgesDto })
  @ApiOperation({ summary: 'Create a new judges' })
  @ApiCreatedResponse({
    description: `Judge created successfully`,
    type: CreatedJudgeDto,
  })
  createJudges(
    @Body() createJudgesDto: CreateJudgesDto,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Judges> {
    this.logger.verbose(
      `User "${user.username}" create a new judges. Judges: ${JSON.stringify(
        createJudgesDto,
      )}`,
    );
    res.status(HttpStatus.CREATED);
    return this.judgesService.createJudges(createJudgesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all judges' })
  @ApiOkResponse({
    description: `Find all judges successfully`,
    type: [JudgeDto],
  })
  findAllJudges(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
  ): Promise<Judges[]> {
    this.logger.verbose(`User "${user.username}" find all judges.`);
    res.status(HttpStatus.OK);
    return this.judgesService.findAllJudges();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one judges' })
  @ApiOkResponse({
    description: `Find one judge by id successfully`,
    type: JudgeDto,
  })
  findOneJudges(
    @Param('id') id: UUIDVersion,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Judges> {
    this.logger.verbose(`User "${user.username}" find one judge id: ${id}`);
    res.status(HttpStatus.OK);
    return this.judgesService.findOneJudges(id);
  }

  @Put(':id')
  @ApiBody({ type: JudgeDto })
  @ApiOperation({ summary: 'Update one judge' })
  @ApiOkResponse({
    description: `Judges update successfully`,
    type: JudgeDto,
  })
  updateJudges(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: UUIDVersion,
    @Body() createJudgesDto: CreateJudgesDto,
  ): Promise<Judges> {
    this.logger.verbose(`User "${user.username}" update judge id: ${id}`);
    res.status(HttpStatus.OK);
    return this.judgesService.updateJudges(id, createJudgesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete judge by ID' })
  @ApiNoContentResponse({
    description: `Delete judge successfully`,
  })
  deleteJudges(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: UUIDVersion,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.username}" delete judge id: ${id}`);
    res.status(HttpStatus.NO_CONTENT);
    return this.judgesService.deleteJudges(id);
  }
}
