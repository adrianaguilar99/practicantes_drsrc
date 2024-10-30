import { OmitType } from '@nestjs/swagger';
import { CreateEmergencyContactDto } from './create-emergency-contact.dto';

export class UpdateEmergencyContactDto extends OmitType(
  CreateEmergencyContactDto,
  ['internId'] as const,
) {}
