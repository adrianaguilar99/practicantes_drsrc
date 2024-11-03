import { Injectable } from '@nestjs/common';
import { CreateInternReportDto } from './dto/create-intern-report.dto';
// import { UpdateInternReportDto } from './dto/update-intern-report.dto';

@Injectable()
export class InternReportsService {
  create(createInternReportDto: CreateInternReportDto) {
    return 'This action adds a new internReport';
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
