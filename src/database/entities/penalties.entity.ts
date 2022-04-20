import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schools } from './schools.entity';
import { Event } from './event.entity';

@Entity()
export class Penalties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((_type) => Event, (event) => event.penalties)
  event: Event;

  @JoinColumn({ name: 'school_id' })
  @ManyToOne((_type) => Schools, (schools) => schools.id, { eager: true })
  school: Schools;

  @Column()
  value: number;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
