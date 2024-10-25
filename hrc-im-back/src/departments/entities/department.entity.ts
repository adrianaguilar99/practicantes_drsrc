import { ApiProperty } from '@nestjs/swagger';
import { normalizeString } from 'src/common/utils';
import { Intern } from 'src/interns/entities/intern.entity';
import { Supervisor } from 'src/supervisors/entities/supervisor.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('departments')
export class Department {
  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Department ID',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Human Resources',
    description: 'Name of the department.',
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

  @ApiProperty({
    example: '2024-01-01 00:00:00.000',
    description: 'The time the department was created. This ',
  })
  @Column({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt: Date;

  @OneToMany(() => Supervisor, (supervisors) => supervisors.department, {
    eager: true,
  })
  supervisors: Supervisor[];

  @OneToMany(() => Intern, (interns) => interns.department)
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
