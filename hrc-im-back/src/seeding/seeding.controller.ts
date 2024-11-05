import { Controller, Get, HttpCode } from '@nestjs/common';
import { SeedingService } from './seeding.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRoles } from 'src/auth/decorators';
import { SUCCESSFUL_SEED } from 'src/common/constants/constants';
import { UserRole } from 'src/common/enums';

@ApiTags('Seeds')
@Controller('seeding')
export class SeedingController {
  constructor(private readonly seedingService: SeedingService) {}

  @UserRoles(UserRole.ADMINISTRATOR)
  @ApiOperation({
    summary: `${SUCCESSFUL_SEED} Only: ${UserRole.ADMINISTRATOR}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_SEED,
  })
  @HttpCode(200)
  @Get()
  executeSeed() {
    return this.seedingService.runSeed();
  }
}
