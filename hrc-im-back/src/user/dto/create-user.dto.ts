import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$&*])[A-Za-z\d!@#$&*]{10,}$/, {
    message:
      'Password must be at least 10 characters long, contain one uppercase letter, and one special character.',
  })
  password: string;

  createdAt?: string;
}
