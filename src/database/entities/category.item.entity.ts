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

@Entity()
export class CategoryItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((_type) => Category, (category) => category.id, { eager: true })
  category: Category;

  @JoinTable()
  @ManyToMany((_type) => Judges, (judges) => judges.id, { eager: true })
  judges: Judges[];

  @ManyToOne((_type) => Event, (event) => event.categoryItem)
  event: Event;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
