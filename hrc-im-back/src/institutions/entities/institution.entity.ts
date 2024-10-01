import { ApiProperty } from '@nestjs/swagger';
import { SubmissionStatus } from 'src/common/enums';
import { normalizeString } from 'src/common/utils';
import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('institutions')
export class Institution {
  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Institution ID',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Universidad Politécnica de Quintana Roo',
    description: 'Name of the institution.',
    uniqueItems: true,
    nullable: false,
  })
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  name: string;

  @ApiProperty({
    example: '9988774455',
    description: 'Institution cell phone.',
    nullable: false,
  })
  @Column({ type: 'varchar', length: 10, nullable: false })
  phone: string;

  @ApiProperty({
    example: '2024-01-01 00:00:00.000',
    description: 'The time the institution was submitted.',
  })
  @Column({ type: 'timestamp' })
  submissionDate: Date;

  @ApiProperty({
    example: SubmissionStatus.PENDING,
    description: 'The current status of the institution submission.',
    default: SubmissionStatus.PENDING,
    nullable: true,
  })
  @Column({
    type: 'enum',
    enum: SubmissionStatus,
    default: SubmissionStatus.PENDING,
    nullable: true,
  })
  status: SubmissionStatus;

  @ApiProperty({
    type: () => User,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'User ID to make the relationship.',
    nullable: false,
  })
  @ManyToOne(() => User, (user) => user.institutions, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  submittedBy: User;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.name = normalizeString(this.name);
    this.submissionDate = new Date();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.name = normalizeString(this.name);
  }
}
