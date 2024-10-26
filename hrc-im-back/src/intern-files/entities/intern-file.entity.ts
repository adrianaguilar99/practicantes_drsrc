import { ApiProperty } from '@nestjs/swagger';
import { Intern } from 'src/interns/entities/intern.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('intern_files')
export class InternFile {
  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Intern File ID',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'photo-123456.jpg',
    description: 'The file path of the intern photo.',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  photo: string;

  @ApiProperty({
    example: 'curp-123456.pdf',
    description: 'The file path of the intern CURP document.',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  curp: string;

  @ApiProperty({
    example: 'proofOfAddress-123456.pdf',
    description: 'The file path of the proof of address document.',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  proofOfAddress: string;

  @ApiProperty({
    example: 'birthCertificate-123456.pdf',
    description: 'The file path of the birth certificate document.',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  birthCertificate: string;

  @ApiProperty({
    example: 'medicalInsurance-123456.pdf',
    description: 'The file path of the medical insurance document.',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  medicalInsurance: string;

  // @Exclude()
  @ApiProperty({
    type: () => Intern,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Intern ID to make the relationship.',
    nullable: false,
  })
  @ManyToOne(() => Intern, (intern) => intern.internFiles, {
    nullable: false,
  })
  @JoinColumn({ name: 'intern_id' })
  intern: Intern;
}
