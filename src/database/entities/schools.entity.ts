import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './groups.entity';
import { Questions } from './questions.entity';

@Entity()
export class Schools {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne((_type) => Group, (group) => group.schools, { eager: false })
  @Exclude({ toPlainOnly: true })
  group: Group;

  @OneToMany((_type) => Questions, (questions) => questions.school, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  questions: Questions[];
}
