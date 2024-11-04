import { Module } from '@nestjs/common';
import { PdfPrinterService } from './pdf-printer.service';

@Module({
  providers: [PdfPrinterService],
  exports: [PdfPrinterService],
})
export class PdfPrinterModule {}
