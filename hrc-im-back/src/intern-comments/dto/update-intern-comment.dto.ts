import { OmitType } from '@nestjs/swagger';
import { CreateInternCommentDto } from './create-intern-comment.dto';

export class UpdateInternCommentDto extends OmitType(CreateInternCommentDto, [
  'internId',
  'supervisorId',
] as const) {}
