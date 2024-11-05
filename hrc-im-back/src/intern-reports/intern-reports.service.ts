import { Injectable } from '@nestjs/common';
import { CreateInternReportDto } from './dto/create-intern-report.dto';
import { PdfPrinterService } from 'src/pdf-printer/pdf-printer.service';
import {
  getEmploymentLetter,
  getInternReport,
  getInternsReport,
} from 'src/reports';
import { AttendancesService } from 'src/attendances/attendances.service';

@Injectable()
export class InternReportsService {
  constructor(
    private readonly pdfPrinterService: PdfPrinterService,
    private readonly attendancesService: AttendancesService,
  ) {}

  hello() {
    const docDefinition = getInternReport({ name: 'Martin Martinez Arias' });
    const doc = this.pdfPrinterService.createPdf(docDefinition);
    return doc;
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetter();
    const doc = this.pdfPrinterService.createPdf(docDefinition);
    return doc;
  }

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
}
