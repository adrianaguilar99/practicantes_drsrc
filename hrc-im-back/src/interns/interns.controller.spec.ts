import { Test, TestingModule } from '@nestjs/testing';
import { InternsController } from './interns.controller';
import { InternsService } from './interns.service';

describe('InternsController', () => {
  let controller: InternsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternsController],
      providers: [InternsService],
    }).compile();

    controller = module.get<InternsController>(InternsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
