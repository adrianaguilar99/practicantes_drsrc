import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateInternScheduleDto } from './create-intern-schedule.dto';

export class UpdateInternScheduleDto extends PartialType(
  OmitType(CreateInternScheduleDto, ['internId'] as const),
) {}
