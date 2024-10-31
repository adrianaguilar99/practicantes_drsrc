import { PartialType } from '@nestjs/swagger';
import { CreateInternScheduleDto } from './create-intern-schedule.dto';

export class UpdateInternScheduleDto extends PartialType(CreateInternScheduleDto) {}
