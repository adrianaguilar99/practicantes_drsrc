import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeInternReportDto {
  @ApiProperty({
    description: 'Start date for the search range in YYYY-MM-DD format',
    example: '2024-11-01',
  })
  @IsDateString()
  @IsNotEmpty({ message: 'The start date cannot be empty' })
  start: string;

  @ApiProperty({
    description: 'End date for the search range in YYYY-MM-DD format',
    example: '2024-11-30',
  })
  @IsDateString()
  @IsNotEmpty({ message: 'The end date cannot be empty' })
  end: string;

  @ApiProperty({
    description: 'Type of intern: Internal or external.',
    example: 'internal',
  })
  @IsString()
  @IsNotEmpty()
  type: string;
}
