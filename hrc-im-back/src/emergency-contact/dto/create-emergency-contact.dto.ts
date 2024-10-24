import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, Matches } from 'class-validator';
import { Intern } from 'src/interns/entities/intern.entity';

export class CreateEmergencyContactDto {
  @ApiProperty({
    example: 'Leonardo Daniel Rebollo Calero',
    description:
      'Full name of the emergency contact person associated with the intern.',
    uniqueItems: false,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '9988123456',
    description: 'Phone number of the emergency contact.',
    uniqueItems: false,
    nullable: false,
  })
  @Matches(/^[0-9]{10}$/, {
    message: 'The phone number must contain only digits',
  })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'Father, Mother, Guardian',
    description:
      'The relationship between the intern and their emergency contact (e.g., Father, Mother, etc.).',
    uniqueItems: false,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  relationship: string;

  @ApiProperty({
    example: 'Manager at XYZ Corporation, Employee in ...',
    description: `Job position of the emergency contact at their current place of employment.
    This field is optional and may provide additional context about the contact's role.`,
    uniqueItems: false,
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  positionContact: string;

  @ApiProperty({
    type: () => Intern,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Career ID to make the relationship.',
    nullable: true,
  })
  @IsUUID()
  @IsNotEmpty()
  internId: string;
}
