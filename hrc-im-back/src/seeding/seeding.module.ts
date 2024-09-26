import { Module } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { SeedingController } from './seeding.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [SeedingController],
  providers: [SeedingService],
})
export class SeedingModule {}
