import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Judges {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  question_id: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
