import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateInternDto } from './create-intern.dto';

export class UpdateInternDto extends PartialType(
  OmitType(CreateInternDto, ['userId'] as const),
) {}
