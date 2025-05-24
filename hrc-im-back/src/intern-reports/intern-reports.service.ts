import { Injectable } from '@nestjs/common';
import { CreateInternReportDto } from './dto/create-intern-report.dto';
import { PdfPrinterService } from 'src/pdf-printer/pdf-printer.service';
import {
  getInternReportById,
  getInternsReport,
  getTypeInternReport,
} from 'src/reports';
import { AttendancesService } from 'src/attendances/attendances.service';
import { CreateTypeInternReportDto } from './dto/create-type-intern-report.dto';

@Injectable()
export class InternReportsService {
  constructor(
    private readonly pdfPrinterService: PdfPrinterService,
    private readonly attendancesService: AttendancesService,
  ) {}

  async internsReport(createInternReportDto: CreateInternReportDto) {
    const allInternsAttendances =
      await this.attendancesService.findAllToMakeReport(
        createInternReportDto.start,
        createInternReportDto.end,
      );

    const docDefinition = getInternsReport({
      allInternsAttendances,
    });

    return this.pdfPrinterService.createPdf(docDefinition);
  }

  async typeInternReport(createTypeInternReportDto: CreateTypeInternReportDto) {
    const allTypeInternAttendances =
      await this.attendancesService.findAllToMakeTypeInternReport(
        createTypeInternReportDto.start,
        createTypeInternReportDto.end,
        createTypeInternReportDto.type,
      );

    const docDefinition = getTypeInternReport({
      allTypeInternAttendances,
    });

    return this.pdfPrinterService.createPdf(docDefinition);
  }

  async internReportById(
    internId: string,
    createInternReportDto: CreateInternReportDto,
  ) {
    const allInternAttendances =
      await this.attendancesService.findAllToMakeInternReportById(
        internId,
        createInternReportDto.start,
        createInternReportDto.end,
      );

    console.log({ allInternAttendances });

    const docDefinition = getInternReportById({
      allInternAttendances,
    });

    return this.pdfPrinterService.createPdf(docDefinition);
  }
}
