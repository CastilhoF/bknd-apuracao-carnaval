import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Schools } from './schools.entity';
import { Event } from './event.entity';

@Entity()
export class Penalties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((_type) => Event, (event) => event.penalties)
  event: Event;

  @ManyToOne((_type) => Schools, (school) => school.id, { eager: true })
  school: Schools;

  @Column()
  value: number;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
