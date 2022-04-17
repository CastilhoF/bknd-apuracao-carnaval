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
import { CreateVerificationDto } from '../dtos/create.verification.dto';
import { User } from '../../../database/entities/user.entity';
import { Verification } from '../../../database/entities/verification.entity';
import { VerificationService } from '../service/verification.service';
import { Logger } from '@nestjs/common';

@Controller('verification')
@UseGuards(AuthGuard())
export class VerificationController {
  private logger = new Logger('VerificationController');

  constructor(private verificationService: VerificationService) {}

  @Post()
  createVerification(
    @Body() createVerificationDto: CreateVerificationDto,
    @GetUser() user: User,
  ): Promise<Verification> {
    this.logger.verbose(
      `User "${
        user.username
      }" create a new verification. Verification: ${JSON.stringify(
        createVerificationDto,
      )}`,
    );
    return this.verificationService.createVerification(createVerificationDto);
  }

  @Get()
  findAllVerification(@GetUser() user: User): Promise<Verification[]> {
    this.logger.verbose(`User "${user.username}" find all verification.`);
    return this.verificationService.findAllVerification();
  }

  @Get(':id')
  findOneVerification(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Verification> {
    this.logger.verbose(
      `User "${user.username}" find one verification id: ${id}`,
    );
    return this.verificationService.findOneVerification(id);
  }

  @Patch(':id')
  updateVerification(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() createVerificationDto: CreateVerificationDto,
  ): Promise<Verification> {
    this.logger.verbose(
      `User "${user.username}" update verification id: ${id}`,
    );
    return this.verificationService.updateVerification(
      id,
      createVerificationDto,
    );
  }

  @Delete(':id')
  deleteVerification(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" delete verification id: ${id}`,
    );
    return this.verificationService.deleteVerification(id);
  }
}
