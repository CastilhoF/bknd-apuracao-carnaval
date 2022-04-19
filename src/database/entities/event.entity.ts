import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CategoryItem } from './category.item.entity';
import { Notes } from './notes.entity';
import { Schools } from './schools.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  city_name: string;

  @Column()
  year: number;

  @Column()
  champions: number;

  @Column()
  demotes: number;

  @Column()
  discard_min: boolean;

  @Column()
  discard_max: boolean;

  @JoinColumn({ name: 'category_item_id' })
  @OneToMany((_type) => CategoryItem, (categoryItem) => categoryItem.id, {
    cascade: true,
  })
  categoryItem: CategoryItem[];

  @JoinColumn({ name: 'school_id' })
  @OneToMany((_type) => Schools, (school) => school.id, { cascade: true })
  schools: Schools[];

  @JoinColumn({ name: 'notes_id' })
  @OneToMany((_types) => Notes, (notes) => notes.id, { cascade: true })
  notes: Notes[];

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
