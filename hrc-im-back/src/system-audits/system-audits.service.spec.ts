import { Test, TestingModule } from '@nestjs/testing';
import { SystemAuditsService } from './system-audits.service';

describe('SystemAuditsService', () => {
  let service: SystemAuditsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemAuditsService],
    }).compile();

    service = module.get<SystemAuditsService>(SystemAuditsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
