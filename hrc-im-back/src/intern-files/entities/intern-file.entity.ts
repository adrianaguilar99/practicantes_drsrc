import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Intern } from 'src/interns/entities/intern.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
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
  @Column({
    name: 'photo_path',
    type: 'varchar',
    nullable: true,
  })
  photo: string;

  @ApiProperty({
    example: 'curp-123456.pdf',
    description: 'The file path of the intern CURP document.',
    nullable: true,
  })
  @Column({
    name: 'compiled_documents_path',
    type: 'varchar',
    nullable: true,
  })
  compiledDocuments: string;

  @Exclude()
  @ApiProperty({
    type: () => Intern,
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Intern ID to make the relationship.',
    nullable: false,
  })
  @OneToOne(() => Intern, (intern) => intern.internFiles, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'intern_id' })
  intern: Intern;
}
