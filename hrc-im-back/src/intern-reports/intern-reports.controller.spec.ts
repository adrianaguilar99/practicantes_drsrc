import { Test, TestingModule } from '@nestjs/testing';
import { InternReportsController } from './intern-reports.controller';
import { InternReportsService } from './intern-reports.service';

describe('InternReportsController', () => {
  let controller: InternReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternReportsController],
      providers: [InternReportsService],
    }).compile();

    controller = module.get<InternReportsController>(InternReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
