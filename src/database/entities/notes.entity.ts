import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Event } from './event.entity';
import { Judges } from './judges.entity';
import { Schools } from './schools.entity';
import { Category } from './category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';

@Entity()
@Unique(['event', 'judge', 'school', 'category'])
export class Notes {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  @ApiProperty()
  @JoinColumn({ name: 'judge_id' })
  @ManyToOne((_type) => Judges, { eager: true })
  judge: Judges;

  @JoinColumn({ name: 'school_id' })
  @ManyToOne((_type) => Schools, { eager: true })
  school: Schools;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne((_type) => Category, (category) => category.id, { eager: true })
  category: Category;

  @ManyToOne((_type) => Event, (event) => event.notes)
  event: Event;

  @ApiProperty()
  @Column()
  value: string;

  @ApiProperty()
  @Column()
  createdAt: string;

  @ApiProperty()
  @Column()
  updatedAt: string;
}
