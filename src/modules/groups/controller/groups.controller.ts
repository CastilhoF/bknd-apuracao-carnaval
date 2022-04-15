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

  // @Get()
  // findAllGroups(@GetUser() user: User): Promise<Group[]> {
  //   this.logger.verbose(`User "${user.username}" find all groups.`);
  //   return this.groupService.findAllGroups();
  // }

  // @Get(':id')
  // findOneGroup(@Param('id') id: string, @GetUser() user: User): Promise<Group> {
  //   this.logger.verbose(`User "${user.username}" find one group id: ${id}`);
  //   return this.groupService.findOneGroup(id);
  // }

  // @Patch(':id')
  // updateGroup(
  //   @GetUser() user: User,
  //   @Param('id') id: string,
  //   @Body() createGroupDto: CreateGroupDto,
  // ): Promise<Group> {
  //   this.logger.verbose(`User "${user.username}" update group id: ${id}`);
  //   return this.groupService.updateGroup(id, createGroupDto);
  // }

  // @Delete(':id')
  // deleteGroup(@GetUser() user: User, @Param('id') id: string): Promise<void> {
  //   this.logger.verbose(`User "${user.username}" delete group id: ${id}`);
  //   return this.groupService.deleteGroup(id);
  // }
}
