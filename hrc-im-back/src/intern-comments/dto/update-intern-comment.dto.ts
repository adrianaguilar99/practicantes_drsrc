import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateInternCommentDto } from './create-intern-comment.dto';

export class UpdateInternCommentDto extends PartialType(
  OmitType(CreateInternCommentDto, ['internId'] as const),
) {}
