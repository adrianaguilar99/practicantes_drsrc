import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Param,
  ParseUUIDPipe,
  //  Patch, Param, Delete ,Get
} from '@nestjs/common';
import { InternReportsService } from './intern-reports.service';
import { CreateInternReportDto } from './dto/create-intern-report.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FORBIDDEN_RESOURCE,
  UNAUTHORIZED_ACCESS,
} from 'src/common/constants/constants';
import { Public, UserRoles } from 'src/auth/decorators';
import { UserRole } from 'src/common/enums';
// import { UpdateInternReportDto } from './dto/update-intern-report.dto';

@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@ApiResponse({ status: 403, description: FORBIDDEN_RESOURCE })
@ApiTags('Intern Reports')
@Controller('intern-reports')
export class InternReportsController {
  constructor(private readonly internReportsService: InternReportsService) {}

  @Post()
  create(@Body() createInternReportDto: CreateInternReportDto) {
    return this.internReportsService.create(createInternReportDto);
  }

  // @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @Public()
  @Get()
  async intern(@Res() res: Response) {
    const pdfDoc = await this.internReportsService.internsReport();
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Intern Report';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('employment-letter')
  async employmentLetter(@Res() res: Response) {
    const pdfDoc = this.internReportsService.employmentLetter();
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  // @Get('employment-letter/:id')
  // async employmentLetterById(
  //   @Res() res: Response,
  //   @Param('id', ParseUUIDPipe) id: string,
  // ) {
  //   const pdfDoc = await this.internReportsService.employmentLetterById(id);
  //   res.setHeader('Content-Type', 'application/pdf');
  //   pdfDoc.info.Title = 'Employment Letter';
  //   pdfDoc.pipe(res);
  //   pdfDoc.end();
  // }
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
