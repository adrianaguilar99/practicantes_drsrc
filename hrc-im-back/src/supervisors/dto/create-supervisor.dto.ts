import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Matches } from 'class-validator';

export class CreateSupervisorDto {
  @ApiProperty({
    example: '9988774455',
    description: "Supervisor's cell phone.",
    nullable: false,
  })
  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/, {
    message: 'The phone number must contain exactly 10 digits',
  })
  phone: string;

  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'Department ID',
    nullable: false,
  })
  @IsUUID()
  @IsNotEmpty()
  departmentId: string;

  @ApiProperty({
    example: 'b7ba0f09-5a6e-4146-93c2-0c9b934162fe',
    description: 'User ID',
    nullable: false,
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
