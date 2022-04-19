import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { Category } from './category.entity';
import { Event } from './event.entity';
import { Judges } from './judges.entity';

@Entity()
export class CategoryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'category_id' })
  @ManyToOne((_type) => Category, { cascade: true })
  category: Category;

  @JoinTable()
  @ManyToMany((_type) => Judges, {
    cascade: true,
  })
  judges: Judges[];

  @JoinColumn({ name: 'event_id' })
  @ManyToOne((_type) => Event, { cascade: true })
  event: Event;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
