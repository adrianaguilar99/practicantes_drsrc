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

@Entity('institutions')
export class Institution {
  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Institution ID',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Universidad Politécnica de Quintana Roo',
    description: 'Name of the institution.',
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
    example: '9988774455',
    description: 'Institution cell phone.',
    nullable: false,
  })
  @Column({
    name: 'phone',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  phone: string;

  @ApiProperty({
    example: '2024-01-01 00:00:00.000',
    description: 'The time the institution was created. This ',
  })
  @Column({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @OneToMany(() => Intern, (interns) => interns.institution)
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
