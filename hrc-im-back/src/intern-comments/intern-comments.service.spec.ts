import { Test, TestingModule } from '@nestjs/testing';
import { InternCommentsService } from './intern-comments.service';

describe('InternCommentsService', () => {
  let service: InternCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternCommentsService],
    }).compile();

    service = module.get<InternCommentsService>(InternCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
