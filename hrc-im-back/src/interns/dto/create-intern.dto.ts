import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
} from 'class-validator';
import { Career } from 'src/careers/entities/career.entity';
import { InternStatus } from 'src/common/enums';
import { Department } from 'src/departments/entities/department.entity';
import { Institution } from 'src/institutions/entities/institution.entity';
import { Property } from 'src/properties/entities/property.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateInternDto {
  @ApiProperty({
    example: 'ABC-abc-1234',
    description: 'Unique 10-digit code generated for the intern.',
    uniqueItems: true,
    nullable: false,
  })
  internCode: string;

  @ApiProperty({
    example: '9988774455',
    description: "Intern's cell phone number.",
    nullable: false,
  })
  @Matches(/^[0-9]{10}$/, {
    message: 'The phone number must contain exactly 10 digits',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example:
      'Blvd. Kukulcan Km 14, Zona Hotelera, 77500 Cancun, Quintana Roo · 15 km',
    description: "Intern's residential address.",
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: '202100142',
    description: 'School enrollment number for external interns.',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  schoolEnrollment: string;

  @ApiProperty({
    example: '2024-10-01',
    description: 'Start date of the internship period (YYYY-MM-DD).',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  internshipStart: Date;

  @ApiProperty({
    example: '2025-03-01',
    description: 'End date of the internship period (YYYY-MM-DD).',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  internshipEnd: Date;

  @ApiProperty({
    example: InternStatus.ACTIVE,
    description: "Intern's status.",
    nullable: false,
    default: InternStatus.ACTIVE,
  })
  @IsString()
  @IsNotEmpty()
  status: InternStatus;

  @ApiProperty({
    type: () => Career,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Career ID to make the relationship.',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  careerId: string;

  @ApiProperty({
    type: () => Department,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Department ID to make the relationship.',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  departmentId: string;

  @ApiProperty({
    type: () => Department,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Intership department ID to make the relationship.',
    nullable: false,
  })
  @IsUUID()
  @IsNotEmpty()
  internshipDepartmentId: string;

  @ApiProperty({
    type: () => Institution,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Institution ID to make the relationship.',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  institutionId: string;

  @ApiProperty({
    type: () => Property,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Property ID to make the relationship.',
    nullable: false,
  })
  @IsUUID()
  @IsNotEmpty()
  propertyId: string;

  @ApiProperty({
    type: () => User,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'User ID to make the relationship.',
    nullable: false,
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
