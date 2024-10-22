import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('emergency_contacts')
export class EmergencyContact {
  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Emergency contact ID',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Leonardo Daniel Rebollo Calero',
    description:
      'Full name of the emergency contact person associated with the intern.',
    uniqueItems: false,
    nullable: false,
  })
  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    unique: false,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    example: '9988123456',
    description: 'Phone number of the emergency contact.',
    uniqueItems: false,
    nullable: false,
  })
  @Column({
    name: 'phone',
    type: 'varchar',
    length: 50,
    unique: false,
    nullable: false,
  })
  phone: string;

  @ApiProperty({
    example: 'Father, Mother, Guardian',
    description:
      'The relationship between the intern and their emergency contact (e.g., Father, Mother, etc.).',
    uniqueItems: false,
    nullable: false,
  })
  @Column({
    name: 'relationship',
    type: 'varchar',
    length: 50,
    unique: false,
    nullable: false,
  })
  relationship: string;

  @ApiProperty({
    example: 'Manager at XYZ Corporation, Employee in ...',
    description: `Job position of the emergency contact at their current place of employment.
    This field is optional and may provide additional context about the contact's role.`,
    uniqueItems: false,
    nullable: true,
  })
  @Column({
    name: 'position_contact',
    type: 'varchar',
    length: 50,
    unique: false,
    nullable: true,
  })
  position_contact: string;
}
