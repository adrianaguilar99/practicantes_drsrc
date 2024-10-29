import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Intern } from 'src/interns/entities/intern.entity';
import { Supervisor } from 'src/supervisors/entities/supervisor.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('intern_comments')
export class InternComment {
  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Unique identifier for the comment (UUID).',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example:
      'Sit consectetur fugiat minim mollit aliqua sit fugiat laboris voluptate ut deserunt elit et. Duis deserunt ullamco dolor adipisicing in aute fugiat pariatur et quis.',
    description: 'The content of the comment written by the supervisor.',
    nullable: false,
  })
  @Column({
    name: 'posted_comment',
    type: 'text',
    nullable: false,
  })
  postedComment: string;

  @ApiProperty({
    example: '2024-01-01 00:00:00.000',
    description: 'The date and time when the comment was created.',
  })
  @Column({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-05 12:00:00.000',
    description: 'The date and time when the comment was last updated.',
  })
  @Column({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt: Date;

  @Exclude()
  @ApiProperty({
    type: () => Intern,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description:
      'The intern to whom the comment is related, identified by Intern ID (UUID).',
    nullable: false,
  })
  @ManyToOne(() => Intern, (intern) => intern.internComents, {
    nullable: false,
  })
  @JoinColumn({ name: 'intern_id' })
  intern: Intern;

  @Exclude()
  @ApiProperty({
    type: () => Supervisor,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description:
      'The supervisor who wrote the comment, identified by Supervisor ID (UUID).',
    nullable: false,
  })
  @ManyToOne(() => Supervisor, (supervisor) => supervisor.internComents, {
    nullable: false,
  })
  @JoinColumn({ name: 'supervisor_id' })
  supervisor: Supervisor;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = this.createdAt;
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.updatedAt = new Date();
  }
}
