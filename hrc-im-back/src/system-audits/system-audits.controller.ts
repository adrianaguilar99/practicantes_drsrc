import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SystemAuditsService } from './system-audits.service';
import { UserRoles } from 'src/auth/decorators';
import { UserRole } from 'src/common/enums';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  READ_ALL_RECORDS,
  READ_RECORD,
  UNAUTHORIZED_ACCESS,
} from 'src/common/constants/constants';

@UserRoles(UserRole.ADMINISTRATOR)
@ApiTags('Audits')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@ApiResponse({
  status: 403,
  description: `${UNAUTHORIZED_ACCESS}`,
})
@Controller('system-audits')
export class SystemAuditsController {
  constructor(private readonly systemAuditsService: SystemAuditsService) {}

  @ApiOperation({
    summary: `${READ_ALL_RECORDS} Only: ${UserRole.ADMINISTRATOR}`,
  })
  @HttpCode(200)
  @Get()
  findAll() {
    return this.systemAuditsService.findAll();
  }

  @ApiOperation({
    summary: `${READ_RECORD} Only: ${UserRole.ADMINISTRATOR}`,
  })
  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.systemAuditsService.findOne(id);
  }
}
