import { ApiProperty } from '@nestjs/swagger';
import { normalizeString } from 'src/common/utils';
import { Intern } from 'src/interns/entities/intern.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('careers')
export class Career {
  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Career ID',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Software Engineering',
    description: 'Name of the career.',
    uniqueItems: true,
    nullable: false,
  })
  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    example: '2024-01-01 00:00:00.000',
    description: 'The time the career was created. This ',
  })
  @Column({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @OneToMany(() => Intern, (interns) => interns.career)
  interns: Intern[];

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.name = normalizeString(this.name);
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.name = normalizeString(this.name);
  }
}
