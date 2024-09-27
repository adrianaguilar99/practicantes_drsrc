import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description:
      'Number of records to be requested in the consultation. This value determines the maximum number of items to be returned.',
    example: 5,
    default: 5,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    description:
      'Number of records to be omitted in the query. This value determines which record the selection of the items will start from.',
    example: 0,
    default: 0,
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
