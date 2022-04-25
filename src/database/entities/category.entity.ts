import { ApiProperty } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CategoryItem } from './category.item.entity';

@Entity()
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @OneToMany((_type) => CategoryItem, (categoryItem) => categoryItem.category)
  categoryItems: CategoryItem[];

  @ApiProperty()
  @Column()
  createdAt: string;

  @ApiProperty()
  @Column()
  updatedAt: string;
}
