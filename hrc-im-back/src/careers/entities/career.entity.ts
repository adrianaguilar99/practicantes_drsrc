import { ApiProperty } from '@nestjs/swagger';
import { SubmissionStatus } from 'src/common/enums';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('careers')
export class Career {
  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Career ID',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Software Engineering',
    description: 'Name of the career.',
    nullable: false,
  })
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @ApiProperty({
    example: '2024-01-01 00:00:00.000',
    description: 'The time the career was submitted.',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  submission_date: Date;

  @ApiProperty({
    example: SubmissionStatus.PENDING,
    description: 'The current status of the career submission.',
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
  @ManyToOne(() => User, (user) => user.careers, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  submittedBy: User;
}
