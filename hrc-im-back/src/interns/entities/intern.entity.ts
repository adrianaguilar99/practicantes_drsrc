import { ApiProperty } from '@nestjs/swagger';
import { Career } from 'src/careers/entities/career.entity';
import { BloodType, InternStatus } from 'src/common/enums';
import { Department } from 'src/departments/entities/department.entity';
import { Institution } from 'src/institutions/entities/institution.entity';
import { Property } from 'src/properties/entities/property.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
    nullable: false,
  })
  @Column({
    name: 'intern_code',
    type: 'varchar',
    length: 6,
    unique: true,
    nullable: false,
  })
  internCode: string;

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
    uniqueItems: true,
    nullable: true,
  })
  @Column({
    name: 'school_enrollment',
    type: 'varchar',
    unique: true,
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

  // Funcion que calcula los dias de progreso del practicante
  calculateRemainingDays(): number {
    const now = new Date();
    const endDate = new Date(this.internshipEnd);
    const diffInTime = endDate.getTime() - now.getTime();
    const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
    return diffInDays;
  }

  // Funcion que calcula las horas de progreso del practicante
  calculateRemainingHours(): number {
    const now = new Date();
    const endDate = new Date(this.internshipEnd);
    const diffInTime = endDate.getTime() - now.getTime();
    const diffInHours = Math.ceil(diffInTime / (1000 * 3600));
    return diffInHours;
  }

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.phone = this.phone.trim();
    this.address = this.address.trim();
    if (this.schoolEnrollment) {
      this.schoolEnrollment = this.schoolEnrollment.trim();
    }
    this.validateDates();
  }

  private validateDates() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const startDate = new Date(this.internshipStart);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(this.internshipEnd);
    endDate.setHours(0, 0, 0, 0);

    // console.log({
    //   startD: startDate.toDateString(),
    //   now: now.toDateString(),
    //   endD: endDate.toDateString(),
    // });

    // Convertimos a cadena para comparar solo la fecha
    if (startDate.toDateString() < now.toDateString())
      throw new Error('The internship start date cannot be in the past.');

    if (startDate > endDate)
      throw new Error(
        'The internship start date cannot be greater than the end date.',
      );

    if (endDate.toDateString() < now.toDateString())
      throw new Error('The internship end date cannot be in the past.');
  }
}
