import { Test, TestingModule } from '@nestjs/testing';
import { PdfPrinterService } from './pdf-printer.service';

describe('PdfPrinterService', () => {
  let service: PdfPrinterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfPrinterService],
    }).compile();

    service = module.get<PdfPrinterService>(PdfPrinterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
