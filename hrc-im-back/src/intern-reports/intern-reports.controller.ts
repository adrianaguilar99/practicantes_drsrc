import { Controller, Post, Body, Get, Res, Param } from '@nestjs/common';
import { InternReportsService } from './intern-reports.service';
import { CreateInternReportDto } from './dto/create-intern-report.dto';
import { CreateTypeInternReportDto } from './dto/create-type-intern-report.dto';
import { Response } from 'express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FORBIDDEN_RESOURCE,
  UNAUTHORIZED_ACCESS,
} from 'src/common/constants/constants';
import { Public, UserRoles } from 'src/auth/decorators';
import { UserRole } from 'src/common/enums';

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

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @Post()
  async interns(
    @Body() createInternReportDto: CreateInternReportDto,
    @Res() res: Response,
  ) {
    const pdfDoc = await this.internReportsService.internsReport(
      createInternReportDto,
    );
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Intern Report';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @Post('typeIntern')
  async typeIntern(
    @Body() createTypeInternReportDto: CreateTypeInternReportDto,
    @Res() res: Response,
  ) {
    const pdfDoc = await this.internReportsService.typeInternReport(
      createTypeInternReportDto,
    );
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Intern Type Report';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Public()
  @Post(':internId')
  async internById(
    @Param('internId') internId: string,
    @Body() createInternReportDto: CreateInternReportDto,
    @Res() res: Response,
  ) {
    const pdfDoc = await this.internReportsService.internReportById(
      internId,
      createInternReportDto,
    );
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Intern Report by ID';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
