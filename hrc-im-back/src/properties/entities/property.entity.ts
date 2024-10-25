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

@Entity('properties')
export class Property {
  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Property ID',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Hard Rock Hotel Cancún',
    description: 'Name of the property.',
    uniqueItems: true,
    nullable: false,
  })
  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @OneToMany(() => Intern, (interns) => interns.property)
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
