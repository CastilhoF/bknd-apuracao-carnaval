import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Penalties } from './penalties.entity';
import { CategoryItem } from './category.item.entity';
import { Notes } from './notes.entity';
import { ApiProperty } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';

@Entity()
export class Event {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column()
  year: number;

  @ApiProperty()
  @Column()
  champions: number;

  @ApiProperty()
  @Column()
  demotes: number;

  @ApiProperty()
  @Column()
  discard_min: boolean;

  @ApiProperty()
  @Column()
  discard_max: boolean;

  @ApiProperty()
  @Column()
  finished: boolean;

  @ApiProperty()
  @Column()
  winner: string;

  @ApiProperty()
  @OneToMany((_type) => CategoryItem, (categoryItem) => categoryItem.event, {
    eager: true,
  })
  categoryItem: CategoryItem[];

  @ApiProperty()
  @OneToMany((_types) => Notes, (notes) => notes.event, {
    eager: true,
  })
  notes: Notes[];

  @ApiProperty()
  @OneToMany((_types) => Penalties, (penalties) => penalties.event, {
    eager: true,
  })
  penalties: Penalties[];

  @ApiProperty()
  @Column()
  createdAt: string;

  @ApiProperty()
  @Column()
  updatedAt: string;
}
