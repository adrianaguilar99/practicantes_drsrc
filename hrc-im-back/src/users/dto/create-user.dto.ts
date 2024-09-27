import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from 'src/common';

export class CreateUserDto {
  @ApiProperty({
    example: 'Martin',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Martinez Arias',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 'martin@gmail.com',
    description: "The user's email. Only unique emails.",
    uniqueItems: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'martin-password',
    description:
      "The user's password. This can be empty by the login through google but it is optional.",
    nullable: true,
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: UserRole,
    description: 'The possible role that the user can obtain.',
    nullable: true,
  })
  @IsEnum(UserRole)
  @IsOptional()
  userRole?: UserRole;
}
