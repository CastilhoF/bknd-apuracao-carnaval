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
import { CreateJudgesDto } from '../dtos/create.judges.dto';
import { User } from 'src/database/entities/user.entity';
import { Judges } from 'src/database/entities/judges.entity';
import { JudgesService } from '../service/judges.service';
import { Logger } from '@nestjs/common';

@Controller('judges')
@UseGuards(AuthGuard())
export class JudgesController {
  private logger = new Logger('JudgesController');

  constructor(private judgesService: JudgesService) {}

  @Post()
  createJudges(
    @Body() createJudgesDto: CreateJudgesDto,
    @GetUser() user: User,
  ): Promise<Judges> {
    this.logger.verbose(
      `User "${user.username}" create a new judges. Judges: ${JSON.stringify(
        createJudgesDto,
      )}`,
    );
    return this.judgesService.createJudges(createJudgesDto);
  }

  @Get()
  findAllJudges(@GetUser() user: User): Promise<Judges[]> {
    this.logger.verbose(`User "${user.username}" find all judges.`);
    return this.judgesService.findAllJudges();
  }

  @Get(':id')
  findOneJudges(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Judges> {
    this.logger.verbose(`User "${user.username}" find one judges id: ${id}`);
    return this.judgesService.findOneJudges(id);
  }

  // @Patch(':id')
  // updateJudges(
  //   @GetUser() user: User,
  //   @Param('id') id: string,
  //   @Body() createJudgesDto: CreateJudgesDto,
  // ): Promise<Judges> {
  //   this.logger.verbose(`User "${user.username}" update judges id: ${id}`);
  //   return this.judgesService.updateJudges(id, createJudgesDto);
  // }

  // @Delete(':id')
  // deleteJudges(@Param('id') id: string, @GetUser() user: User): Promise<void> {
  //   this.logger.verbose(`User "${user.username}" delete judges id: ${id}`);
  //   return this.judgesService.deleteJudges(id);
  // }
}
