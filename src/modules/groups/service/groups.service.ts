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

  async findAllGroups(): Promise<Group[]> {
    return this.groupRepository.findAllGroups();
  }

  async findOneGroup(id: string): Promise<Group> {
    const found = await this.groupRepository.findOneGroup(id);
    if (!found) {
      throw new NotFoundException(`Group with ID "${id}" not found`);
    }
    return found;
  }

  async updateGroup(
    id: string,
    createGroupDto: CreateGroupDto,
  ): Promise<Group> {
    return this.groupRepository.updateGroup(id, createGroupDto);
  }

  async deleteGroup(id: string): Promise<void> {
    const group = await this.groupRepository.findOneGroup(id);
    if (!group) {
      throw new NotFoundException(`Group with ID "${id}" not found`);
    }
    await this.groupRepository.delete(id);
  }
}
