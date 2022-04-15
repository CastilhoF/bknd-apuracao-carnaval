import { EntityRepository, Repository } from 'typeorm';
import { Group } from '../entities/groups.entity';
import { CreateGroupDto } from '../../modules/groups/dtos/create.group.dto';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { FormatDateAndTime } from 'src/utils/format.date';
import { Logger } from '@nestjs/common';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  private logger = new Logger('GroupRepository');

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const { name, event_id } = createGroupDto;

    const date = new Date();

    const createdAt = FormatDateAndTime(date);

    const updatedAt = FormatDateAndTime(date);

    const group = this.create({ name, event_id, createdAt, updatedAt });

    try {
      return await this.save(group);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Group name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findAllGroups(): Promise<Group[]> {
    return await this.find();
  }

  async findOneGroup(id: string): Promise<Group> {
    try {
      const found = await this.findOne(id);
      if (!found) {
        this.logger.error(`Group id "${id}" not found.`);
        throw new NotFoundException(`Group with ID "${id}" not found`);
      }
      return found;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async updateGroup(
    id: string,
    createGroupDto: CreateGroupDto,
  ): Promise<Group> {
    const { name, event_id } = createGroupDto;

    const date = new Date();

    const updatedAt = FormatDateAndTime(date);

    if (!id) {
      this.logger.error(`Group id "${id}" not found.`);
      throw new NotFoundException(`Group with ID "${id}" not found`);
    }

    const group = await this.findOne(id);

    if (!group) {
      this.logger.error(`Group id "${id}" not found.`);
      throw new NotFoundException(`Group with ID "${id}" not found`);
    }

    group.name = name;
    group.event_id = event_id;
    group.updatedAt = updatedAt;

    return await this.save(group);
  }

  // async deleteGroup(id: string): Promise<void> {
  //   const group = await this.findOne(id);

  //   if (!group) {
  //     this.logger.error(`Group id "${id}" not found.`);
  //     throw new NotFoundException(`Group with ID "${id}" not found`);
  //   }

  //   await this.delete(group);
  // }
}
