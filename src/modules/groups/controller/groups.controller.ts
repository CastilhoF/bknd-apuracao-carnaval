import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../../user/decorators/get.user.decorator';
import { CreateGroupDto } from '../dtos/create.group.dto';
import { User } from 'src/database/entities/user.entity';
import { Group } from 'src/database/entities/groups.entity';
import { GroupService } from '../service/groups.service';
import { Logger } from '@nestjs/common';

@Controller('groups')
@UseGuards(AuthGuard())
export class GroupController {
  private logger = new Logger('GroupController');

  constructor(private groupService: GroupService) {}

  @Post()
  createGroup(
    @Body() createGroupDto: CreateGroupDto,
    @GetUser() user: User,
  ): Promise<Group> {
    this.logger.verbose(
      `User "${user.username}" create a new group. Group: ${JSON.stringify(
        createGroupDto,
      )}`,
    );
    return this.groupService.createGroup(createGroupDto);
  }
}
