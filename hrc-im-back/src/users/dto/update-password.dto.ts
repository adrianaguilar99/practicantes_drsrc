import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'NewPassw@rd!23',
    description:
      'The new password for the user. Must be at least 12 characters, with two special characters and one uppercase letter.',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(12, { message: 'Password must be at least 12 characters long.' })
  @Matches(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{2,}).{12,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, two special characters, and be 12 characters long.',
    },
  )
  password: string;
}
