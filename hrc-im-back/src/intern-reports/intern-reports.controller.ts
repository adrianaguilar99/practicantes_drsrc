import {
  Controller,
  Post,
  Body,
  //  Patch, Param, Delete ,Get
} from '@nestjs/common';
import { InternReportsService } from './intern-reports.service';
import { CreateInternReportDto } from './dto/create-intern-report.dto';
// import { UpdateInternReportDto } from './dto/update-intern-report.dto';

@Controller('intern-reports')
export class InternReportsController {
  constructor(private readonly internReportsService: InternReportsService) {}

  @Post()
  create(@Body() createInternReportDto: CreateInternReportDto) {
    return this.internReportsService.create(createInternReportDto);
  }

  // @Get()
  // findAll() {
  //   return this.internReportsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.internReportsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateInternReportDto: UpdateInternReportDto) {
  //   return this.internReportsService.update(+id, updateInternReportDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.internReportsService.remove(+id);
  // }
}
