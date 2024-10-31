import { OmitType } from '@nestjs/swagger';
import { CreateInternDto } from './create-intern.dto';

export class UpdateInternDto extends OmitType(CreateInternDto, [
  'userId',
] as const) {}
