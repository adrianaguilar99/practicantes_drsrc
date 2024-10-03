import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateInstitutionDto {
  @ApiProperty({
    example: 'Universidad Politécnica de Quintana Roo',
    description: 'Name of the institution.',
    uniqueItems: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '9988774455',
    description: 'Institution cell phone.',
    nullable: false,
  })
  @IsNotEmpty()
  @Matches(/^[0-9]+$/, { message: 'The phone number must contain only digits' })
  phone: string;
}
