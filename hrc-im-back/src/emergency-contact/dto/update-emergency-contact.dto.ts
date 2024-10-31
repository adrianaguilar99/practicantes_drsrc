import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateEmergencyContactDto } from './create-emergency-contact.dto';

export class UpdateEmergencyContactDto extends PartialType(
  OmitType(CreateEmergencyContactDto, ['internId'] as const),
) {}
