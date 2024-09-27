import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from 'src/common/constants/constants';
import { UserRole } from 'src/common';
import { ApiProperty } from '@nestjs/swagger';

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
  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @ApiProperty({
    example: 'Martinez Arias',
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @ApiProperty({
    example: 'martin@gmail.com',
    description: "The user's email. Only unique emails.",
    uniqueItems: true,
    nullable: false,
  })
  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @ApiProperty({
    example: 'martin-password',
    description:
      "The user's password. This can be empty by the login through google but it is optional.",
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  password: string;

  @ApiProperty({
    example: '[jwt-token]',
    description:
      'The use of this token is solely to obtain new access tokens. It is destroyed when the user logs out or is not logged in, it is volatile.',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  hashedRefreshToken: string;

  @ApiProperty({
    example: UserRole,
    description: 'The possible role that the user can obtain.',
    nullable: true,
  })
  @Column({ type: 'enum', enum: UserRole, nullable: true })
  userRole: UserRole;

  @ApiProperty({
    example: '2024-09-24 22:50:34.372',
    description: 'The time the user was created.',
    nullable: true,
  })
  @Column({
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  // Rol sera asignado por el administrador
  @BeforeInsert()
  async setCreation() {
    this.email = this.email.toLowerCase();
    await this.hashPassword();
    this.setCreationDate();
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, BCRYPT_SALT_ROUNDS);
  }

  private setCreationDate() {
    this.createdAt = new Date();
  }
}
