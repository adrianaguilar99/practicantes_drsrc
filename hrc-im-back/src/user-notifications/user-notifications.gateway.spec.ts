import { Test, TestingModule } from '@nestjs/testing';
import { UserNotificationsGateway } from './user-notifications.gateway';

describe('UserNotificationsGateway', () => {
  let gateway: UserNotificationsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserNotificationsGateway],
    }).compile();

    gateway = module.get<UserNotificationsGateway>(UserNotificationsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
