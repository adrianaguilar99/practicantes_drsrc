import { Controller, Get } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Seeds')
@Controller('seeding')
export class SeedingController {
  constructor(private readonly seedingService: SeedingService) {}

  @Get()
  executeSeed() {
    return this.seedingService.runSeed();
  }
}
