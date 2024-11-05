import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateInternReportDto {
  @ApiProperty({
    description: 'Start date for the search range in YYYY-MM-DD format',
    example: '2024-11-01',
  })
  @IsString()
  @IsNotEmpty({ message: 'The start date cannot be empty' })
  @IsDateString(
    {},
    { message: 'The start date must be in date format (YYYY-MM-DD)' },
  )
  start: string;

  @ApiProperty({
    description: 'End date for the search range in YYYY-MM-DD format',
    example: '2024-11-30',
  })
  @IsString()
  @IsNotEmpty({ message: 'The end date cannot be empty' })
  @IsDateString(
    {},
    { message: 'The end date must be in date format (YYYY-MM-DD)' },
  )
  end: string;
}
