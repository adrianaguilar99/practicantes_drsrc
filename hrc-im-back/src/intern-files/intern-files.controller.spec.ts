import { Test, TestingModule } from '@nestjs/testing';
import { InternFilesController } from './intern-files.controller';
import { InternFilesService } from './intern-files.service';

describe('InternFilesController', () => {
  let controller: InternFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternFilesController],
      providers: [InternFilesService],
    }).compile();

    controller = module.get<InternFilesController>(InternFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
