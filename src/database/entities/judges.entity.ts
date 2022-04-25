import { ApiProperty } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Judges {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column()
  createdAt: string;

  @ApiProperty()
  @Column()
  updatedAt: string;
}
