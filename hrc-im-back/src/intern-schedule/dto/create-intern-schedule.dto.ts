import { ApiProperty } from '@nestjs/swagger';
import { Intern } from 'src/interns/entities/intern.entity';

export class CreateInternScheduleDto {
  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Monday.',
    nullable: false,
  })
  mondayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Monday.',
    nullable: false,
  })
  mondayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Tuesday.',
    nullable: false,
  })
  tuesdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Tuesday.',
    nullable: false,
  })
  tuesdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Wednesday.',
    nullable: false,
  })
  wednesdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Wednesday.',
    nullable: false,
  })
  wednesdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Thursday.',
    nullable: false,
  })
  thursdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Thursday.',
    nullable: false,
  })
  thursdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Friday.',
    nullable: false,
  })
  fridayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Friday.',
    nullable: false,
  })
  fridayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Saturday.',
    nullable: false,
  })
  saturdayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Saturday.',
    nullable: false,
  })
  saturdayOut: string;

  @ApiProperty({
    example: '08:00:00',
    description: 'Time of entry for the intern on Sunday.',
    nullable: false,
  })
  sundayIn: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time of exit for the intern on Sunday.',
    nullable: false,
  })
  sundayOut: string;

  @ApiProperty({
    type: () => Intern,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Intern ID to make the relationship.',
    nullable: false,
  })
  internId: string;
}
