import { EntityRepository, Repository } from 'typeorm';
import { Group } from '../entities/groups.entity';
import { CreateGroupDto } from '../../modules/groups/dtos/create.group.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FormatDateAndTime } from 'src/utils/format.date';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
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
}
