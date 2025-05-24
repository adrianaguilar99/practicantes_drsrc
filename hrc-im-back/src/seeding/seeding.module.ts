import { Module } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { SeedingController } from './seeding.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [SeedingController],
  providers: [SeedingService],
})
export class SeedingModule {}
