import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Intern } from 'src/interns/entities/intern.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('intern_schedule')
export class InternSchedule {
  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Unique identifier for the comment (UUID).',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Monday.',
    nullable: true,
  })
  @Column({ name: 'monday_in', type: 'time', nullable: true })
  mondayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Monday.',
    nullable: true,
  })
  @Column({ name: 'monday_out', type: 'time', nullable: true })
  mondayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Tuesday.',
    nullable: true,
  })
  @Column({ name: 'tuesday_in', type: 'time', nullable: true })
  tuesdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Tuesday.',
    nullable: true,
  })
  @Column({ name: 'tuesday_out', type: 'time', nullable: true })
  tuesdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Wednesday.',
    nullable: true,
  })
  @Column({ name: 'wednesday_in', type: 'time', nullable: true })
  wednesdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Wednesday.',
    nullable: true,
  })
  @Column({ name: 'wednesday_out', type: 'time', nullable: true })
  wednesdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Thursday.',
    nullable: true,
  })
  @Column({ name: 'thursday_in', type: 'time', nullable: true })
  thursdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Thursday.',
    nullable: true,
  })
  @Column({ name: 'thursday_out', type: 'time', nullable: true })
  thursdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Friday.',
    nullable: true,
  })
  @Column({ name: 'friday_in', type: 'time', nullable: true })
  fridayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Friday.',
    nullable: true,
  })
  @Column({ name: 'friday_out', type: 'time', nullable: true })
  fridayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Saturday.',
    nullable: true,
  })
  @Column({ name: 'saturday_in', type: 'time', nullable: true })
  saturdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Saturday.',
    nullable: true,
  })
  @Column({ name: 'saturday_out', type: 'time', nullable: true })
  saturdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Sunday.',
    nullable: true,
  })
  @Column({ name: 'sunday_in', type: 'time', nullable: true })
  sundayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Sunday.',
    nullable: true,
  })
  @Column({ name: 'sunday_out', type: 'time', nullable: true })
  sundayOut: string;

  @Exclude()
  @ApiProperty({
    type: () => Intern,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Intern ID to make the relationship.',
    nullable: false,
  })
  @OneToOne(() => Intern, (intern) => intern.internFiles, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'intern_id' })
  intern: Intern;
}
