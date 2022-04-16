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
import { CreateSchoolsDto } from '../dtos/create.schools.dto';
import { User } from 'src/database/entities/user.entity';
import { Schools } from 'src/database/entities/schools.entity';
import { SchoolsService } from '../service/schools.service';
import { Logger } from '@nestjs/common';

@Controller('schools')
@UseGuards(AuthGuard())
export class SchoolsController {
  private logger = new Logger('SchoolsController');

  constructor(private schoolsService: SchoolsService) {}

  @Post()
  createSchools(
    @Body() createSchoolsDto: CreateSchoolsDto,
    @GetUser() user: User,
  ): Promise<Schools> {
    this.logger.verbose(
      `User "${user.username}" create a new schools. Schools: ${JSON.stringify(
        createSchoolsDto,
      )}`,
    );
    return this.schoolsService.createSchools(createSchoolsDto);
  }

  @Get()
  findAllSchools(@GetUser() user: User): Promise<Schools[]> {
    this.logger.verbose(`User "${user.username}" find all schools.`);
    return this.schoolsService.findAllSchools();
  }

  @Get(':id')
  findOneSchools(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Schools> {
    this.logger.verbose(`User "${user.username}" find one schools id: ${id}`);
    return this.schoolsService.findOneSchools(id);
  }

  // @Patch(':id')
  // updateSchools(
  //   @GetUser() user: User,
  //   @Param('id') id: string,
  //   @Body() createSchoolsDto: CreateSchoolsDto,
  // ): Promise<Schools> {
  //   this.logger.verbose(`User "${user.username}" update schools id: ${id}`);
  //   return this.schoolsService.updateSchools(id, createSchoolsDto);
  // }

  // @Delete(':id')
  // deleteSchools(@Param('id') id: string, @GetUser() user: User): Promise<void> {
  //   this.logger.verbose(`User "${user.username}" delete schools id: ${id}`);
  //   return this.schoolsService.deleteSchools(id);
  // }
}
