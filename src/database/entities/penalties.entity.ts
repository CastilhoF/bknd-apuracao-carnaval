import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schools } from './schools.entity';

@Entity()
export class Penalties {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @JoinColumn({ name: 'school_id' })
  @ManyToOne((_type) => Schools, (schools) => schools.id, { cascade: true })
  school: Schools;

  @Column()
  value: number;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
