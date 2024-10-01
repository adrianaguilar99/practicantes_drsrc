import { Test, TestingModule } from '@nestjs/testing';
import { SystemAuditsController } from './system-audits.controller';
import { SystemAuditsService } from './system-audits.service';

describe('SystemAuditsController', () => {
  let controller: SystemAuditsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemAuditsController],
      providers: [SystemAuditsService],
    }).compile();

    controller = module.get<SystemAuditsController>(SystemAuditsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
