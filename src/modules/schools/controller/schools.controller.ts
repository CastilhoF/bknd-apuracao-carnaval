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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SchoolDto } from '../../../core/config/documentation/dtos/single-objects/school';
import { CreatedSchoolDto } from '../../../core/config/documentation/dtos/created/created.school.dto';
import { UUIDVersion } from 'class-validator';

@ApiBearerAuth()
@Controller('schools')
@ApiTags('Schools')
@UseGuards(AuthGuard())
export class SchoolsController {
  private logger = new Logger('SchoolsController');

  constructor(private schoolsService: SchoolsService) {}

  @Post()
  @ApiBody({ type: CreateSchoolsDto })
  @ApiOperation({ summary: 'Create School' })
  @ApiCreatedResponse({
    description: `School as been created`,
    type: CreatedSchoolDto,
  })
  createSchools(
    @Body() createSchoolsDto: CreateSchoolsDto,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Schools> {
    this.logger.verbose(
      `User "${user.username}" create a new school. School: ${JSON.stringify(
        createSchoolsDto,
      )}`,
    );
    res.status(HttpStatus.CREATED);
    return this.schoolsService.createSchools(createSchoolsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find All Schools' })
  @ApiOkResponse({ description: 'Successfully', type: [SchoolDto] })
  findAllSchools(
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
  ): Promise<Schools[]> {
    this.logger.verbose(`User "${user.username}" find all schools.`);
    res.status(HttpStatus.OK);
    return this.schoolsService.findAllSchools();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find School By ID' })
  @ApiOkResponse({ description: 'Successfully', type: SchoolDto })
  findOneSchools(
    @Param('id') id: UUIDVersion,
    @GetUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Schools> {
    this.logger.verbose(`User "${user.username}" find one schools id: ${id}`);
    res.status(HttpStatus.OK);
    return this.schoolsService.findOneSchools(id);
  }

  @Put(':id')
  @ApiBody({ type: SchoolDto })
  @ApiOperation({ summary: 'Update School By ID' })
  @ApiOkResponse({ description: 'Successfully', type: SchoolDto })
  updateSchools(
    @GetUser() user: User,
    @Param('id') id: UUIDVersion,
    @Body() createSchoolsDto: CreateSchoolsDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Schools> {
    this.logger.verbose(`User "${user.username}" update schools id: ${id}`);
    res.status(HttpStatus.OK);
    return this.schoolsService.updateSchools(id, createSchoolsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete School By ID' })
  @ApiNoContentResponse({
    description: 'School Deleted Successfully',
  })
  deleteSchools(
    @Param('id') id: UUIDVersion,
    @Res({ passthrough: true }) res: Response,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.username}" delete schools id: ${id}`);
    res.status(HttpStatus.NO_CONTENT);
    return this.schoolsService.deleteSchools(id);
  }
}
