import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Schools } from './schools.entity';
import { Event } from './event.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Penalties {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @ManyToOne((_type) => Event, (event) => event.penalties)
  event: Event;

  @ApiProperty()
  @ManyToOne((_type) => Schools, (school) => school.id, { eager: true })
  school: Schools;

  @ApiProperty()
  @Column()
  value: string;

  @ApiProperty()
  @Column()
  createdAt: string;

  @ApiProperty()
  @Column()
  updatedAt: string;
}
