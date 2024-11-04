import { Injectable } from '@nestjs/common';
import { CreateInternReportDto } from './dto/create-intern-report.dto';
import { PdfPrinterService } from 'src/pdf-printer/pdf-printer.service';
import {
  getEmploymentLetter,
  getEmploymentLetterById,
  getInternReport,
  getInternsReport,
} from 'src/reports';
import { InternsService } from 'src/interns/interns.service';

@Injectable()
export class InternReportsService {
  constructor(
    private readonly pdfPrinterService: PdfPrinterService,
    private readonly internsService: InternsService,
  ) {}

  create(createInternReportDto: CreateInternReportDto) {
    return 'This action adds a new internReport';
  }

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

  async employmentLetterById(id: string) {
    const intern = await this.internsService.findOne(id);
    const docDefinition = getEmploymentLetterById({
      employeeHours: +intern.internshipDuration,
      employeeName: intern.user.firstName,
      employeePosition: intern.bloodType,
      employeeStartDate: new Date(intern.internshipStart),
      employeeWorkSchedule: intern.internSchedule.fridayIn,
      employerCompany: intern.property.name,
      employerName: intern.user.lastName,
      employerPosition: intern.address,
    });

    const doc = this.pdfPrinterService.createPdf(docDefinition);

    return doc;
  }

  async internsReport() {
    const docDefinition = getInternsReport();

    return this.pdfPrinterService.createPdf(docDefinition);
  }

  // findAll() {
  //   return `This action returns all internReports`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} internReport`;
  // }

  // update(id: number, updateInternReportDto: UpdateInternReportDto) {
  //   return `This action updates a #${id} internReport`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} internReport`;
  // }
}
