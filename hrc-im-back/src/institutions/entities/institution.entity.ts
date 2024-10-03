import { ApiProperty } from '@nestjs/swagger';
import { normalizeString } from 'src/common/utils';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
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
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  name: string;

  @ApiProperty({
    example: '9988774455',
    description: 'Institution cell phone.',
    nullable: false,
  })
  @Column({ type: 'varchar', length: 20, nullable: false })
  phone: string;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.name = normalizeString(this.name);
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
