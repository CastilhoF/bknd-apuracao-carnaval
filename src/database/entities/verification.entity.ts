import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Verification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  judge_name: string;

  @Column()
  question_name: string;

  @Column()
  school_name: string;

  @Column()
  group_name: string;

  @Column()
  event_name: string;

  @Column()
  note_value: number;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
