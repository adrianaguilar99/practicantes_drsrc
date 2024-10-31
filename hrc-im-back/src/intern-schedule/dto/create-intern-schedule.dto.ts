import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  Validate,
} from 'class-validator';
import { Intern } from 'src/interns/entities/intern.entity';
import { IsAfterHourConstraint } from '../validators';

export class CreateInternScheduleDto {
  // HH:MM:SS formato de 24 horas para validar horas
  private static readonly TIME_FORMAT = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Monday.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(CreateInternScheduleDto.TIME_FORMAT, {
    message: 'Invalid time format, should be HH:MM:SS',
  })
  mondayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Monday.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(CreateInternScheduleDto.TIME_FORMAT, {
    message: 'Invalid time format, should be HH:MM:SS',
  })
  @Validate(IsAfterHourConstraint, ['mondayIn'], {
    message: 'mondayOut must be after mondayIn',
  })
  mondayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Tuesday.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(CreateInternScheduleDto.TIME_FORMAT, {
    message: 'Invalid time format, should be HH:MM:SS',
  })
  tuesdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Tuesday.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(CreateInternScheduleDto.TIME_FORMAT, {
    message: 'Invalid time format, should be HH:MM:SS',
  })
  @Validate(IsAfterHourConstraint, ['tuesdayIn'], {
    message: 'tuesdayOut must be after tuesdayIn',
  })
  tuesdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Wednesday.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(CreateInternScheduleDto.TIME_FORMAT, {
    message: 'Invalid time format, should be HH:MM:SS',
  })
  wednesdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Wednesday.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(CreateInternScheduleDto.TIME_FORMAT, {
    message: 'Invalid time format, should be HH:MM:SS',
  })
  @Validate(IsAfterHourConstraint, ['wednesdayIn'], {
    message: 'wednesdayOut must be after wednesdayIn',
  })
  wednesdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Thursday.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(CreateInternScheduleDto.TIME_FORMAT, {
    message: 'Invalid time format, should be HH:MM:SS',
  })
  thursdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Thursday.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(CreateInternScheduleDto.TIME_FORMAT, {
    message: 'Invalid time format, should be HH:MM:SS',
  })
  @Validate(IsAfterHourConstraint, ['thursdayIn'], {
    message: 'thursdayOut must be after thursdayIn',
  })
  thursdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Friday.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(CreateInternScheduleDto.TIME_FORMAT, {
    message: 'Invalid time format, should be HH:MM:SS',
  })
  fridayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Friday.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(CreateInternScheduleDto.TIME_FORMAT, {
    message: 'Invalid time format, should be HH:MM:SS',
  })
  @Validate(IsAfterHourConstraint, ['fridayIn'], {
    message: 'fridayOut must be after fridayIn',
  })
  fridayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Saturday.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(CreateInternScheduleDto.TIME_FORMAT, {
    message: 'Invalid time format, should be HH:MM:SS',
  })
  saturdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Saturday.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(CreateInternScheduleDto.TIME_FORMAT, {
    message: 'Invalid time format, should be HH:MM:SS',
  })
  @Validate(IsAfterHourConstraint, ['saturdayIn'], {
    message: 'saturdayOut must be after saturdayIn',
  })
  saturdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Sunday.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(CreateInternScheduleDto.TIME_FORMAT, {
    message: 'Invalid time format, should be HH:MM:SS',
  })
  sundayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Sunday.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(CreateInternScheduleDto.TIME_FORMAT, {
    message: 'Invalid time format, should be HH:MM:SS',
  })
  @Validate(IsAfterHourConstraint, ['sundayIn'], {
    message: 'sundayOut must be after sundayIn',
  })
  sundayOut: string;

  @ApiProperty({
    type: () => Intern,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Intern ID to make the relationship.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsUUID()
  internId: string;
}
