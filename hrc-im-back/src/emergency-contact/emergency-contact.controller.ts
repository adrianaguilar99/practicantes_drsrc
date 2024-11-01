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
  ParseUUIDPipe,
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
  BAD_REQUEST,
  CONFLICT_ERROR,
  CREATE_RECORD,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  READ_ALL_RECORDS,
  READ_RECORD,
  REMOVE_RECORD,
  SUCCESSFUL_CREATION,
  SUCCESSFUL_DELETION,
  SUCCESSFUL_FETCH,
  SUCCESSFUL_UPDATE,
  UNAUTHORIZED_ACCESS,
  UPDATE_RECORD,
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
  @ApiResponse({ status: 400, description: BAD_REQUEST })
  @ApiResponse({ status: 404, description: NOT_FOUND })
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

  @ApiOperation({
    summary: `${READ_ALL_RECORDS} All users can access this endpoint`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: [EmergencyContact],
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Get()
  async findAll(): Promise<IApiResponse<any>> {
    const allEmergencyContacts = await this.emergencyContactService.findAll();
    return {
      message: SUCCESSFUL_FETCH,
      data: allEmergencyContacts,
      records: allEmergencyContacts.length,
    };
  }

  @ApiOperation({
    summary: `${READ_RECORD} All users can access this endpoint.`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: EmergencyContact,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @HttpCode(200)
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const emergencyContact = await this.emergencyContactService.findOne(id);
    return { message: SUCCESSFUL_FETCH, data: emergencyContact };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${UPDATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_UPDATE,
    type: EmergencyContact,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 409, description: CONFLICT_ERROR })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEmergencyContactDto: UpdateEmergencyContactDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const updatedEmergencyContact = await this.emergencyContactService.update(
      id,
      updateEmergencyContactDto,
      user,
    );
    return { message: SUCCESSFUL_UPDATE, data: updatedEmergencyContact };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${REMOVE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_DELETION,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const deletedEmergencyContact = await this.emergencyContactService.remove(
      id,
      user,
    );
    return { message: SUCCESSFUL_DELETION, data: deletedEmergencyContact };
  }
}
