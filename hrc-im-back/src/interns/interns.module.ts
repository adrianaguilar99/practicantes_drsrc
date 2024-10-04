import { Module } from '@nestjs/common';
import { InternsService } from './interns.service';
import { InternsController } from './interns.controller';

@Module({
  controllers: [InternsController],
  providers: [InternsService],
})
export class InternsModule {}
