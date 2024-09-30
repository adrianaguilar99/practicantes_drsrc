import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { SubmissionStatus } from 'src/common/enums';

export class CreateInstitutionDto {
  @ApiProperty({
    example: 'Universidad Politécnica de Quintana Roo',
    description: 'Name of the institution.',
    uniqueItems: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '9988774455',
    description: 'Institution cell phone.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsPhoneNumber('MX')
  phone: string;

  @ApiProperty({
    example: SubmissionStatus.PENDING,
    description:
      'The status of the career submission. Only ADMINISTRATOR and RH SUPERVISORS can set this field.',
    nullable: true,
  })
  @IsEnum(SubmissionStatus)
  @IsOptional()
  status?: SubmissionStatus;
}
