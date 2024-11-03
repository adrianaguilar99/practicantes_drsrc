import { Module } from '@nestjs/common';
import { InternReportsService } from './intern-reports.service';
import { InternReportsController } from './intern-reports.controller';

@Module({
  controllers: [InternReportsController],
  providers: [InternReportsService],
})
export class InternReportsModule {}
