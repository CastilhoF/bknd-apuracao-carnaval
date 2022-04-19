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
import { CreateSchoolsDto } from '../dtos/create.schools.dto';
import { User } from '../../../database/entities/user.entity';
import { Schools } from '../../../database/entities/schools.entity';
import { SchoolsService } from '../service/schools.service';
import { Logger } from '@nestjs/common';
import { Response } from 'express';

@Controller('schools')
@UseGuards(AuthGuard())
export class SchoolsController {
  private logger = new Logger('SchoolsController');

  constructor(private schoolsService: SchoolsService) {}

  @Post()
  createSchools(
    @Body() createSchoolsDto: CreateSchoolsDto,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Schools> {
    this.logger.verbose(
      `User "${user.username}" create a new schools. Schools: ${JSON.stringify(
        createSchoolsDto,
      )}`,
    );
    res.status(HttpStatus.CREATED);
    return this.schoolsService.createSchools(createSchoolsDto);
  }

  @Get()
  findAllSchools(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
  ): Promise<Schools[]> {
    this.logger.verbose(`User "${user.username}" find all schools.`);
    res.status(HttpStatus.OK);
    return this.schoolsService.findAllSchools();
  }

  @Get(':id')
  findOneSchools(
    @Param('id') id: string,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Schools> {
    this.logger.verbose(`User "${user.username}" find one schools id: ${id}`);
    res.status(HttpStatus.OK);
    return this.schoolsService.findOneSchools(id);
  }

  @Put(':id')
  updateSchools(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() createSchoolsDto: CreateSchoolsDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Schools> {
    this.logger.verbose(`User "${user.username}" update schools id: ${id}`);
    res.status(HttpStatus.OK);
    return this.schoolsService.updateSchools(id, createSchoolsDto);
  }

  @Delete(':id')
  deleteSchools(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.username}" delete schools id: ${id}`);
    res.status(HttpStatus.NO_CONTENT);
    return this.schoolsService.deleteSchools(id);
  }
}
