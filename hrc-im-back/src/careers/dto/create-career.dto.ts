import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SubmissionStatus } from 'src/common/enums';

export class CreateCareerDto {
  @ApiProperty({
    example: 'Software Engineering',
    description: 'Name of the career.',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: SubmissionStatus.PENDING,
    description:
      'The status of the career submission. Only ADMINISTRATOR and SUPERVISOR can set this field.',
    nullable: true,
  })
  @IsEnum(SubmissionStatus)
  @IsOptional()
  status?: SubmissionStatus;
}
