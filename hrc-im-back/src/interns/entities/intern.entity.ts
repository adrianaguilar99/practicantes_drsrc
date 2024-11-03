import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { AttendancesService } from 'src/attendances/attendances.service';
import { Attendance } from 'src/attendances/entities/attendance.entity';
import { Career } from 'src/careers/entities/career.entity';
import { BloodType, InternStatus } from 'src/common/enums';
import { Department } from 'src/departments/entities/department.entity';
import { EmergencyContact } from 'src/emergency-contact/entities/emergency-contact.entity';
import { Institution } from 'src/institutions/entities/institution.entity';
import { InternComment } from 'src/intern-comments/entities/intern-comment.entity';
import { InternFile } from 'src/intern-files/entities/intern-file.entity';
import { InternSchedule } from 'src/intern-schedule/entities/intern-schedule.entity';
import { Property } from 'src/properties/entities/property.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('interns')
export class Intern {
  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Intern ID',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '123456',
    description: 'Unique 6-digit code generated for the intern.',
    uniqueItems: true,
    nullable: true,
  })
  @Column({
    name: 'external_intern_code',
    type: 'varchar',
    length: 6,
    unique: true,
    nullable: true,
  })
  externalInternCode: string;

  @ApiProperty({
    example: '123456',
    description: 'Unique 6-digit code generated for the intern.',
    uniqueItems: true,
    nullable: true,
  })
  @Column({
    name: 'internal_intern_code',
    type: 'varchar',
    length: 6,
    unique: true,
    nullable: true,
  })
  internalInternCode: string;

  @ApiProperty({
    example: 'O+',
    description: "Intern's blood type.",
    nullable: false,
  })
  @Column({
    name: 'blood_type',
    type: 'enum',
    enum: BloodType,
    nullable: false,
  })
  bloodType: BloodType;

  @ApiProperty({
    example: '9988774455',
    description: "Intern's cell phone number.",
    nullable: false,
  })
  @Column({ name: 'phone', type: 'varchar', length: 10, nullable: false })
  phone: string;

  @ApiProperty({
    example:
      'Blvd. Kukulcan Km 14, Zona Hotelera, 77500 Cancun, Quintana Roo · 15 km',
    description: "Intern's residential address.",
    nullable: false,
  })
  @Column({ name: 'address', type: 'varchar', nullable: false })
  address: string;

  @ApiProperty({
    example: '202100142',
    description: 'School enrollment number for external interns.',
    uniqueItems: false,
    nullable: true,
  })
  @Column({
    name: 'school_enrollment',
    type: 'varchar',
    unique: false,
    nullable: true,
  })
  schoolEnrollment: string;

  @ApiProperty({
    example: '2024-10-01',
    description: 'Start date of the internship period (YYYY-MM-DD).',
    nullable: false,
  })
  @Column({ name: 'internship_start', type: 'date', nullable: false })
  internshipStart: Date;

  @ApiProperty({
    example: '2025-03-01',
    description: 'End date of the internship period (YYYY-MM-DD).',
    nullable: false,
  })
  @Column({ name: 'internship_end', type: 'date', nullable: false })
  internshipEnd: Date;

  @ApiProperty({
    example: '300 hours',
    description: 'Total hours the practitioner is expected to cover.',
    nullable: false,
  })
  @Column({ name: 'internship_duration', type: 'interval', nullable: true })
  internshipDuration: string;

  @ApiProperty({
    example: InternStatus.ACTIVE,
    description: "Intern's status.",
    nullable: false,
    default: InternStatus.ACTIVE,
  })
  @Column({
    name: 'status',
    type: 'enum',
    enum: InternStatus,
    nullable: false,
    default: InternStatus.ACTIVE,
  })
  status: InternStatus;

  @ApiProperty({
    example: 50.75,
    description: 'The percentage of the internship completed.',
  })
  @Column({
    name: 'total_internship_completion',
    type: 'numeric',
    nullable: true,
    precision: 5,
    scale: 2,
    default: 0,
  })
  totalInternshipCompletion: number;

  @ApiProperty({
    type: () => Career,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Career ID to make the relationship.',
    nullable: true,
  })
  @ManyToOne(() => Career, (career) => career.interns, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'career_id' })
  career: Career;

  @ApiProperty({
    type: () => Department,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Department ID to make the relationship.',
    nullable: true,
  })
  @ManyToOne(() => Department, (department) => department.interns, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @ApiProperty({
    type: () => Department,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Intership department ID to make the relationship.',
    nullable: false,
  })
  @ManyToOne(() => Department, (department) => department.interns, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'internship_department_id' })
  internshipDepartment: Department;

  @ApiProperty({
    type: () => Institution,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Institution ID to make the relationship.',
    nullable: true,
  })
  @ManyToOne(() => Institution, (institution) => institution.interns, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'institution_id' })
  institution: Institution;

  @ApiProperty({
    type: () => Property,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Property ID to make the relationship.',
    nullable: false,
  })
  @ManyToOne(() => Property, (property) => property.interns, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @ApiProperty({
    type: () => User,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'User ID to make the relationship.',
    nullable: false,
  })
  @OneToOne(() => User, (user) => user.intern, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => EmergencyContact,
    (emergencyContacts) => emergencyContacts.intern,
    { eager: true },
  )
  emergencyContacts: EmergencyContact[];

  @OneToMany(() => InternComment, (internComments) => internComments.intern, {
    eager: true,
  })
  internComents: InternComment[];

  @OneToOne(() => InternFile, (internFiles) => internFiles.intern, {
    eager: true,
  })
  internFiles: InternFile;

  @OneToOne(() => InternSchedule, (internSchedule) => internSchedule.intern, {
    eager: true,
  })
  internSchedule: InternSchedule;

  @OneToMany(() => Attendance, (attendances) => attendances.intern)
  attendances: Attendance[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.phone = this.phone.trim();
    this.address = this.address.trim();
    if (this.schoolEnrollment) {
      this.schoolEnrollment = this.schoolEnrollment.trim();
    }
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
