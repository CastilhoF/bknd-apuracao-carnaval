import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryItem } from './category.item.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany((_type) => CategoryItem, (categoryItem) => categoryItem.category)
  categoryItems: CategoryItem[];

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
