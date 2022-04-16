import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Questions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question_name: string;

  @Column()
  judge_one_id: string;

  @Column()
  judge_two_id: string;

  @Column()
  judge_three_id: string;

  @Column()
  judge_four_id: string;

  @Column()
  judge_five_id: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
