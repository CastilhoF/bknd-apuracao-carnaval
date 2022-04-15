import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  event_id: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
