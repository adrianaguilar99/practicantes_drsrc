import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Req,
} from '@nestjs/common';
import { EmergencyContactService } from './emergency-contact.service';
import { CreateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CONFLICT_ERROR,
  CREATE_RECORD,
  INTERNAL_SERVER_ERROR,
  SUCCESSFUL_CREATION,
  UNAUTHORIZED_ACCESS,
} from 'src/common/constants/constants';
import { UserRoles } from 'src/auth/decorators';
import { UserRole } from 'src/common/enums';
import { EmergencyContact } from './entities/emergency-contact.entity';
import { IApiResponse } from 'src/common/interfaces';

@ApiTags('Emergency Contacts')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@Controller('emergency-contact')
export class EmergencyContactController {
  constructor(
    private readonly emergencyContactService: EmergencyContactService,
  ) {}

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${CREATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 201,
    description: SUCCESSFUL_CREATION,
    type: EmergencyContact,
  })
  @ApiResponse({ status: 409, description: CONFLICT_ERROR })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(201)
  @Post()
  async create(
    @Body() createEmergencyContactDto: CreateEmergencyContactDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const createdEmergencyContact = await this.emergencyContactService.create(
      createEmergencyContactDto,
      user,
    );

    return { message: SUCCESSFUL_CREATION, data: createdEmergencyContact };
  }

  @Get()
  findAll() {
    return this.emergencyContactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emergencyContactService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmergencyContactDto: UpdateEmergencyContactDto,
  ) {
    return this.emergencyContactService.update(+id, updateEmergencyContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergencyContactService.remove(+id);
  }
}
