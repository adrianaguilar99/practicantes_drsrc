import { Test, TestingModule } from '@nestjs/testing';
import { InternScheduleService } from './intern-schedule.service';

describe('InternScheduleService', () => {
  let service: InternScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternScheduleService],
    }).compile();

    service = module.get<InternScheduleService>(InternScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
