import { Controller, Get, HttpCode, Req } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators';
import { SUCCESSFUL_SEED } from 'src/common/constants/constants';

@ApiTags('Seeds')
@Controller('seeding')
export class SeedingController {
  constructor(private readonly seedingService: SeedingService) {}
  @Public()
  @ApiOperation({ summary: SUCCESSFUL_SEED })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_SEED,
  })
  @HttpCode(200)
  @Get()
  executeSeed(@Req() req) {
    const user = req.user;
    return this.seedingService.runSeed(user);
  }
}
