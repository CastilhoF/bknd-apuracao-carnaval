import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';
import { Judges } from './judges.entity';
import { Schools } from './schools.entity';
import { Category } from './category.entity';

@Entity()
export class Notes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column()
  value: number;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
