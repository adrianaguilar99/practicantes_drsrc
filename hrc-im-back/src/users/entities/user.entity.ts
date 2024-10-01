import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from 'src/common/constants/constants';
import { ApiProperty } from '@nestjs/swagger';
import { Career } from 'src/careers/entities/career.entity';
import { UserRole } from 'src/common/enums';
import { dateToFormattedTimestamp } from 'src/common/utils/';
import { Institution } from 'src/institutions/entities/institution.entity';

@Entity('users')
export class User {
  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'User ID',
    uniqueItems: true,
    nullable: false,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Martin',
    nullable: false,
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  firstName: string;

  @ApiProperty({
    example: 'Martinez Arias',
    nullable: false,
  })
  @Column({ type: 'varchar', length: 50, nullable: false })
  lastName: string;

  @ApiProperty({
    example: 'martin@gmail.com',
    description: "The user's email. Only unique emails.",
    uniqueItems: true,
    nullable: false,
  })
  @Column({ type: 'varchar', unique: true, length: 100, nullable: false })
  email: string;

  @ApiProperty({
    example: 'martin-password',
    description:
      "The user's password. It is required and can be generic if the user logs in through Google.",
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  password?: string;

  @ApiProperty({
    example: '[jwt-token]',
    description:
      'The use of this token is solely to obtain new access tokens. It is destroyed when the user logs out or is not logged in; it is volatile.',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  hashedRefreshToken: string;

  @ApiProperty({
    example: UserRole,
    description: 'The possible role that the user can obtain.',
    default: UserRole.INTERN,
    nullable: true,
  })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.INTERN,
    nullable: true,
  })
  userRole: UserRole;

  @ApiProperty({
    example: '2024-01-01 00:00:00.000',
    description: 'The time the user was created.',
  })
  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => Career, (careers) => careers.submittedBy)
  careers: Career[];

  @OneToMany(() => Institution, (institutions) => institutions.submittedBy)
  institutions: Institution[];

  @BeforeInsert()
  async setCreation?() {
    this.email = this.email.toLowerCase();
    await this.hashPassword();
    // const dateString = new Date().toLocaleString();
    this.createdAt = new Date();
  }

  private async hashPassword?() {
    this.password = await bcrypt.hash(this.password, BCRYPT_SALT_ROUNDS);
  }
}
