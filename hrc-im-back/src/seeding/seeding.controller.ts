import { Controller, Get } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators';

@ApiTags('Seeds')
@Controller('seeding')
export class SeedingController {
  constructor(private readonly seedingService: SeedingService) {}

  @Public()
  @Get()
  executeSeed() {
    return this.seedingService.runSeed();
  }
}
