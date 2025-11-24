import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({
    example: 'Dreams Sapphire Resort & Spa',
    description: 'Name of the property.',
    uniqueItems: true,
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
