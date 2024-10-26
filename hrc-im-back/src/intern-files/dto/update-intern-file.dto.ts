import { PartialType } from '@nestjs/swagger';
import { CreateInternFileDto } from './create-intern-file.dto';

export class UpdateInternFileDto extends PartialType(CreateInternFileDto) {}
