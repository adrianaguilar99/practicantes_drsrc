import { PartialType } from '@nestjs/swagger';
import { CreateInternReportDto } from './create-intern-report.dto';

export class UpdateInternReportDto extends PartialType(CreateInternReportDto) {}
