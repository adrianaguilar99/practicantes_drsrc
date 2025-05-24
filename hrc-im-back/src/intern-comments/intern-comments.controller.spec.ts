import { Test, TestingModule } from '@nestjs/testing';
import { InternCommentsController } from './intern-comments.controller';
import { InternCommentsService } from './intern-comments.service';

describe('InternCommentsController', () => {
  let controller: InternCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternCommentsController],
      providers: [InternCommentsService],
    }).compile();

    controller = module.get<InternCommentsController>(InternCommentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
