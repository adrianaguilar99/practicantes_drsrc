import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCareerDto {
  @ApiProperty({
    example: 'Software Engineering',
    description: 'Name of the career.',
    uniqueItems: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
