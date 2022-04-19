import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Schools {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  city: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
