import { ApiProperty } from '@nestjs/swagger';
import { AttendanceStatuses } from 'src/common/enums';
import { Intern } from 'src/interns/entities/intern.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('attendances')
export class Attendance {
  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Attendance ID',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '2024-09-01',
    description: 'Date the intern registered his entry.',
    nullable: false,
  })
  @Column({
    name: 'attendance_date',
    type: 'date',
    nullable: false,
  })
  attendanceDate: string;

  @ApiProperty({
    example: '09:00:00',
    description: 'Time the intern registered his entry.',
    nullable: true,
  })
  @Column({ name: 'entry_time', type: 'time', nullable: true })
  entryTime: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time the intern registered his exit.',
    nullable: true,
  })
  @Column({ name: 'exit_time', type: 'time', nullable: true })
  exitTime: string;

  @ApiProperty({
    example: AttendanceStatuses.ENTRY,
    description: 'The different statuses that assistance may have.',
    nullable: false,
  })
  @Column({
    name: 'attendance_statuses',
    type: 'enum',
    enum: AttendanceStatuses,
    nullable: false,
  })
  attendanceStatuses: AttendanceStatuses;

  @ApiProperty({
    example: false,
    description: 'Check if the intern was late.',
    default: true,
  })
  @Column({ name: 'is_late', type: 'boolean', default: false })
  isLate: boolean;

  @ApiProperty({
    description: 'The hours worked by the intern in the day.',
    nullable: true,
  })
  @Column({ name: 'worked_hours', type: 'time', nullable: true })
  worked_hours: string;

  @ApiProperty({
    type: () => Intern,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Intern ID to make the relationship.',
    nullable: false,
  })
  @ManyToOne(() => Intern, (intern) => intern.attendances, {
    eager: true,
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'intern_id' })
  intern: Intern;
}
