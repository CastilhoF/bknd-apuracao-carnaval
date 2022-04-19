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
  @ManyToOne((_type) => Judges, { cascade: true })
  judge: Judges;

  @JoinColumn({ name: 'school_id' })
  @ManyToOne((_type) => Schools, { cascade: true })
  school: Schools;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne((_type) => Category, { cascade: true })
  category: Category;

  @JoinColumn({ name: 'event_id' })
  @ManyToOne((_type) => Event, { cascade: true })
  event: Event;

  @Column()
  value: number;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
