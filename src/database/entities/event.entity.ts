import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './groups.entity';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToMany((_type) => Group, (group) => group.event, { eager: false })
  group: Group[];
}
