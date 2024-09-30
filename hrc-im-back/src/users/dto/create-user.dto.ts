import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { UserRole } from 'src/common/enums';

export class CreateUserDto {
  @ApiProperty({
    example: 'Martin',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Martinez Arias',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
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
    example: 'generic-password',
    description:
      "The user's password. It is required and can be generic if the user logs in through Google.",
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  password?: string;

  @ApiProperty({
    example: UserRole,
    description: 'The possible role that the user can obtain.',
    nullable: true,
  })
  @IsEnum(UserRole)
  @IsOptional()
  userRole?: UserRole;
}
