import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';

@Entity()
export class Schools {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: UUIDVersion;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column()
  createdAt: string;

  @ApiProperty()
  @Column()
  updatedAt: string;
}
