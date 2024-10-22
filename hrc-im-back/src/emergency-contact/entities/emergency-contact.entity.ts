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
    description: 'Intern contact name.',
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
    description: 'Intern contact phone.',
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
    example: 'Father, Mother, ...',
    description: "Relationship of the intern's emergency contact.",
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
    example: 'Employee in ...',
    description:
      "The position of the intern's emergency contact in the company where he or she works.",
    uniqueItems: false,
    nullable: false,
  })
  @Column({
    name: 'position_contact',
    type: 'varchar',
    length: 50,
    unique: false,
    nullable: false,
  })
  position_contact: string;
}
