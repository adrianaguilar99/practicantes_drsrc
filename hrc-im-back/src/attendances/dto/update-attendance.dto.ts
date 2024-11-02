import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  Validate,
} from 'class-validator';
import { TIME_FORMAT } from 'src/common/constants/constants';
import { AttendanceStatuses } from 'src/common/enums';
import { IsAfterHourConstraint } from 'src/common/validators';

export class UpdateAttendanceDto {
  @ApiProperty({
    example: '09:00:00',
    description: 'Time the intern registered his entry.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
  entryTime: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time the intern registered his exit.',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Matches(TIME_FORMAT, { message: 'Invalid time format, should be HH:MM:SS' })
  @Validate(IsAfterHourConstraint, ['entryTime'], {
    message: 'exitTime must be after entryTime',
  })
  exitTime: string;

  @ApiProperty({
    example: false,
    description: 'Check if the intern was late.',
  })
  @IsOptional()
  @IsBoolean()
  isLate: boolean;

  @ApiProperty({
    example: AttendanceStatuses.ENTRY,
    description: 'The different statuses that assistance may have.',
    nullable: true,
  })
  @IsOptional()
  @IsEnum(AttendanceStatuses)
  @IsString()
  attendanceStatuses: AttendanceStatuses;
}
