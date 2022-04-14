import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Questions } from './questions.entity';
import { Schools } from './schools.entity';
import { Judges } from './judges.entity';
import { Group } from './groups.entity';

@Entity()
export class Verification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nota: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
