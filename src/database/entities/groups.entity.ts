import { Exclude } from 'class-transformer';
import { Event } from './event.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schools } from './schools.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne((_type) => Event, (event) => event.group, { eager: false })
  @Exclude({ toPlainOnly: true })
  event: Event;

  @OneToMany((_type) => Schools, (schools) => schools.group, { eager: false })
  @Exclude({ toPlainOnly: true })
  schools: Schools[];
}
