import { Test, TestingModule } from '@nestjs/testing';
import { InternScheduleController } from './intern-schedule.controller';
import { InternScheduleService } from './intern-schedule.service';

describe('InternScheduleController', () => {
  let controller: InternScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternScheduleController],
      providers: [InternScheduleService],
    }).compile();

    controller = module.get<InternScheduleController>(InternScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
