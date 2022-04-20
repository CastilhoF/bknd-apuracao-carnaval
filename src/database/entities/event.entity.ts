import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Penalties } from './penalties.entity';
import { CategoryItem } from './category.item.entity';
import { Notes } from './notes.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  city: string;

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

  @OneToMany((_type) => CategoryItem, (categoryItem) => categoryItem.event, {
    eager: true,
  })
  categoryItem: CategoryItem[];

  @OneToMany((_types) => Notes, (notes) => notes.event, { eager: true })
  notes: Notes[];

  @OneToMany((_types) => Penalties, (penalties) => penalties.event, {
    eager: true,
  })
  penalties: Penalties[];

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
