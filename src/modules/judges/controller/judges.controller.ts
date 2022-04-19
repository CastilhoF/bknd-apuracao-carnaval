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
import { Logger } from '@nestjs/common';
import { Response } from 'express';

@Controller('judges')
@UseGuards(AuthGuard())
export class JudgesController {
  private logger = new Logger('JudgesController');

  constructor(private judgesService: JudgesService) {}

  @Post()
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
  findAllJudges(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
  ): Promise<Judges[]> {
    this.logger.verbose(`User "${user.username}" find all judges.`);
    res.status(HttpStatus.OK);
    return this.judgesService.findAllJudges();
  }

  @Get(':id')
  findOneJudges(
    @Param('id') id: string,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Judges> {
    this.logger.verbose(`User "${user.username}" find one judges id: ${id}`);
    res.status(HttpStatus.OK);
    return this.judgesService.findOneJudges(id);
  }

  @Put(':id')
  updateJudges(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
    @Body() createJudgesDto: CreateJudgesDto,
  ): Promise<Judges> {
    this.logger.verbose(`User "${user.username}" update judges id: ${id}`);
    res.status(HttpStatus.OK);
    return this.judgesService.updateJudges(id, createJudgesDto);
  }

  @Delete(':id')
  deleteJudges(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.username}" delete judges id: ${id}`);
    res.status(HttpStatus.NO_CONTENT);
    return this.judgesService.deleteJudges(id);
  }
}
