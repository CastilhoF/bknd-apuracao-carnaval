import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schools {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  group_id: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
