import { Test, TestingModule } from '@nestjs/testing';
import { InternReportsService } from './intern-reports.service';

describe('InternReportsService', () => {
  let service: InternReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternReportsService],
    }).compile();

    service = module.get<InternReportsService>(InternReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
