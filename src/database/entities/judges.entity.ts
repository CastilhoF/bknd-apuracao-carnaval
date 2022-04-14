import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Questions } from './questions.entity';

@Entity()
export class Judges {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @ManyToOne((_type) => Questions, (questions) => questions.judges, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  questions: Questions[];
}
