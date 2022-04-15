import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../../../database/entities/groups.entity';
import { CreateGroupDto } from '../dtos/create.group.dto';
import { GroupRepository } from '../../../database/repositories/groups.repository';
import { EventRepository } from '../../../database/repositories/event.repository';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
    private eventRepository: EventRepository,
  ) {}

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const found = await this.eventRepository.findOneEvent(
      createGroupDto.event_id,
    );

    if (!found) {
      throw new NotFoundException(
        `Event with ID "${createGroupDto.event_id}" not found`,
      );
    }
    return this.groupRepository.createGroup(createGroupDto);
  }
}
