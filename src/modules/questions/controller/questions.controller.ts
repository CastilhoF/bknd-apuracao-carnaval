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
import { CreateQuestionDto } from '../dtos/create.question.dto';
import { User } from '../../../database/entities/user.entity';
import { Questions } from '../../../database/entities/questions.entity';
import { QuestionsService } from '../service/questions.service';
import { Logger } from '@nestjs/common';

@Controller('questions')
@UseGuards(AuthGuard())
export class QuestionsController {
  private logger = new Logger('QuestionsController');

  constructor(private questionsService: QuestionsService) {}

  @Post()
  createQuestion(
    @Body() createQuestionDto: CreateQuestionDto,
    @GetUser() user: User,
  ): Promise<Questions> {
    this.logger.verbose(
      `User "${
        user.username
      }" create a new question. Question: ${JSON.stringify(createQuestionDto)}`,
    );
    return this.questionsService.createQuestions(createQuestionDto);
  }

  @Get()
  findAllQuestions(@GetUser() user: User): Promise<Questions[]> {
    this.logger.verbose(`User "${user.username}" find all questions.`);
    return this.questionsService.findAllQuestions();
  }

  @Get(':id')
  findOneQuestion(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Questions> {
    this.logger.verbose(`User "${user.username}" find one question id: ${id}`);
    return this.questionsService.findOneQuestion(id);
  }

  // @Patch(':id')
  // updateQuestion(
  //   @GetUser() user: User,
  //   @Param('id') id: string,
  //   @Body() createQuestionDto: CreateQuestionDto,
  // ): Promise<Questions> {
  //   this.logger.verbose(`User "${user.username}" update question id: ${id}`);
  //   return this.questionsService.updateQuestion(id, createQuestionDto);
  // }

  // @Delete(':id')
  // deleteQuestion(
  //   @Param('id') id: string,
  //   @GetUser() user: User,
  // ): Promise<void> {
  //   this.logger.verbose(`User "${user.username}" delete question id: ${id}`);
  //   return this.questionsService.deleteQuestion(id);
  // }
}
