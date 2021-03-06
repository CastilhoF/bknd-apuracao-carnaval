import {
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Category } from './category.entity';
import { Event } from './event.entity';
import { Judges } from './judges.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';

@Entity()
export class CategoryItem {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  @ApiProperty()
  @ManyToOne((_type) => Category, (category) => category.id, { eager: true })
  category: Category;

  @ApiProperty()
  @JoinTable()
  @ManyToMany((_type) => Judges, (judges) => judges.id, { eager: true })
  judges: Judges[];

  @ApiProperty()
  @ManyToOne((_type) => Event, (event) => event.categoryItem, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  event: Event;

  @ApiProperty()
  @Column()
  createdAt: string;

  @ApiProperty()
  @Column()
  updatedAt: string;
}
