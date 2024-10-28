import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Career } from 'src/careers/entities/career.entity';
import { BloodType, InternStatus } from 'src/common/enums';
import { Department } from 'src/departments/entities/department.entity';
import { EmergencyContact } from 'src/emergency-contact/entities/emergency-contact.entity';
import { Institution } from 'src/institutions/entities/institution.entity';
import { InternComment } from 'src/intern-comments/entities/intern-comment.entity';
import { InternFile } from 'src/intern-files/entities/intern-file.entity';
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
    example: '08:00:00',
    description: 'Time of entry for the intern.',
    nullable: false,
  })
  @Column({ name: 'entry_time', type: 'time', nullable: false })
  entryTime: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern.',
    nullable: false,
  })
  @Column({ name: 'exit_time', type: 'time', nullable: false })
  exitTime: string;

  @ApiProperty({
    example: '300:00:00',
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

  @OneToOne(() => InternFile, (internFiles) => internFiles.intern, {
    eager: true,
  })
  internFiles: InternFile;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.phone = this.phone.trim();
    this.address = this.address.trim();
    if (this.schoolEnrollment) {
      this.schoolEnrollment = this.schoolEnrollment.trim();
    }
    this.validateDates();
    this.validateTimes();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }

  private validateDates() {
    const startDate = new Date(this.internshipStart);
    startDate.setHours(
      startDate.getHours() + startDate.getTimezoneOffset() / 60,
    );
    const endDate = new Date(this.internshipEnd);
    endDate.setHours(endDate.getHours() + endDate.getTimezoneOffset() / 60);

    // Verificacion de fechas
    // console.log({
    //   startDateString: startDate.toDateString(),
    //   endDateString: endDate.toDateString(),
    //   startDateGetTime: startDate.getTime(),
    //   endDateGetTime: endDate.getTime(),
    // });

    /**
     * La fecha de inicio y fin si puede ser en el pasado
     * pero la fecha de fin no puede ser menor que la fecha de inicio
     */
    if (endDate.getTime() < startDate.getTime())
      throw new BadRequestException(
        'The internship end date cannot be less than the start date.',
      );
  }

  private validateTimes() {
    const entryTime = this.parseTime(this.entryTime);
    const exitTime = this.parseTime(this.exitTime);

    const minEntryTime = this.parseTime('07:00:00'); // Hora mínima de entrada
    const maxEntryTime = this.parseTime('10:00:00'); // Hora máxima de entrada

    // Validacion: Hora de entrada esté dentro del rango permitido
    if (entryTime < minEntryTime || entryTime > maxEntryTime) {
      throw new BadRequestException(
        'The entry time must be between 07:00 and 10:00.',
      );
    }

    // Validacion: Hora de salida sea mayor que la hora de entrada
    if (exitTime <= entryTime) {
      throw new BadRequestException(
        'The exit time must be later than the entry time.',
      );
    }
  }

  private parseTime(time: string): Date {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, seconds || 0);
    return now;
  }
}
