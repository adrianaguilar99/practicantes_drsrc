import { ApiProperty } from '@nestjs/swagger';
import { normalizeString } from 'src/common/utils';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
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
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  name: string;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.name = normalizeString(this.name);
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
