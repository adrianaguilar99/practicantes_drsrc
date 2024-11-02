import { ApiProperty } from '@nestjs/swagger';
import { Intern } from 'src/interns/entities/intern.entity';

export class CreateAttendanceDto {
  @ApiProperty({
    example: '2024-09-01',
    description: 'Date the intern registered his entry.',
    nullable: false,
  })
  attendanceDate: string;

  @ApiProperty({
    example: '09:00:00',
    description: 'Time the intern registered his entry.',
    nullable: true,
  })
  entryTime: string;

  @ApiProperty({
    example: '17:00:00',
    description: 'Time the intern registered his exit.',
    nullable: true,
  })
  exitTime: string;

  @ApiProperty({
    example: 'Absence, Registered a time of entry without exit, Success.',
    description: 'The different statuses that assistance may have.',
    nullable: true,
  })
  status: string;

  @ApiProperty({
    type: () => Intern,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Intern ID to make the relationship.',
    nullable: false,
  })
  intern: string;
}
