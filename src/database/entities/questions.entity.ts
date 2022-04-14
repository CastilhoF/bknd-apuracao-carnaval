import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Judges } from './judges.entity';
import { Schools } from './schools.entity';

@Entity()
export class Questions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne((_type) => Schools, (schools) => schools.questions, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  school: Schools;

  @OneToMany((_type) => Judges, (judges) => judges.questions, { eager: false })
  @Exclude({ toPlainOnly: true })
  judges: Judges[];
}
