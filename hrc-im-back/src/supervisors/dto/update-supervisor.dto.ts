import { OmitType } from '@nestjs/swagger';
import { CreateSupervisorDto } from './create-supervisor.dto';

export class UpdateSupervisorDto extends OmitType(CreateSupervisorDto, [
  'departmentId',
  'userId',
] as const) {}
