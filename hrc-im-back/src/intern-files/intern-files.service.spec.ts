import { Test, TestingModule } from '@nestjs/testing';
import { InternFilesService } from './intern-files.service';

describe('InternFilesService', () => {
  let service: InternFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternFilesService],
    }).compile();

    service = module.get<InternFilesService>(InternFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
