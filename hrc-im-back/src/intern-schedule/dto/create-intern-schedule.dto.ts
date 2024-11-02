import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Validate,
} from 'class-validator';
import { Intern } from 'src/interns/entities/intern.entity';
import { IsAfterHourConstraint } from '../../common/validators';
import { TIME_FORMAT } from 'src/common/constants/constants';

export class CreateInternScheduleDto {
  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Monday.',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
  mondayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Monday.',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
  @Validate(IsAfterHourConstraint, ['mondayIn'], {
    message: 'mondayOut must be after mondayIn',
  })
  mondayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Tuesday.',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
  tuesdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Tuesday.',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
  @Validate(IsAfterHourConstraint, ['tuesdayIn'], {
    message: 'tuesdayOut must be after tuesdayIn',
  })
  tuesdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Wednesday.',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
  wednesdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Wednesday.',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
  @Validate(IsAfterHourConstraint, ['wednesdayIn'], {
    message: 'wednesdayOut must be after wednesdayIn',
  })
  wednesdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Thursday.',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
  thursdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Thursday.',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
  @Validate(IsAfterHourConstraint, ['thursdayIn'], {
    message: 'thursdayOut must be after thursdayIn',
  })
  thursdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Friday.',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
  fridayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Friday.',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
  @Validate(IsAfterHourConstraint, ['fridayIn'], {
    message: 'fridayOut must be after fridayIn',
  })
  fridayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Saturday.',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
  saturdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Saturday.',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
  @Validate(IsAfterHourConstraint, ['saturdayIn'], {
    message: 'saturdayOut must be after saturdayIn',
  })
  saturdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Sunday.',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
  sundayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Sunday.',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
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
