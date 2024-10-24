import { ApiProperty } from '@nestjs/swagger';
import { normalizeString } from 'src/common/utils';
import { Intern } from 'src/interns/entities/intern.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
    nullable: false,
  })
  @Column({
    name: 'position_contact',
    type: 'varchar',
    length: 50,
    unique: false,
    nullable: false,
  })
  positionContact: string;

  @ApiProperty({
    type: () => Intern,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Intern ID to make the relationship.',
    nullable: false,
  })
  @ManyToOne(() => Intern, (intern) => intern.emergencyContacts, {
    // eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'intern_id' })
  intern: Intern;

  @BeforeInsert()
  setInsertion() {
    this.name = normalizeString(this.name);
    this.positionContact = normalizeString(this.positionContact);
    this.relationship = normalizeString(this.relationship);
  }

  @BeforeUpdate()
  fieldsBeforeUpdate() {
    this.setInsertion();
  }
}
