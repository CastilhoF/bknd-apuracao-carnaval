import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryItem } from './category.item.entity';
import { Notes } from './notes.entity';

@Entity()
export class Judges {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
