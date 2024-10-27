import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CONFLICT_ERROR,
  CREATE_RECORD,
  FORBIDDEN_RESOURCE,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  READ_ALL_RECORDS,
  READ_RECORD,
  REMOVE_ALL_RECORDS,
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
import { Institution } from './entities/institution.entity';
import { IApiResponse } from 'src/common/interfaces';

@ApiTags('Institutions')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${CREATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 201,
    description: SUCCESSFUL_CREATION,
    type: Institution,
  })
  @ApiResponse({ status: 403, description: FORBIDDEN_RESOURCE })
  @ApiResponse({ status: 409, description: CONFLICT_ERROR })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(201)
  @Post()
  async create(
    @Body() createInstitutionDto: CreateInstitutionDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const createdInstitution = await this.institutionsService.create(
      createInstitutionDto,
      user,
    );
    return { message: SUCCESSFUL_CREATION, data: createdInstitution };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${READ_ALL_RECORDS} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: [Institution],
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Get()
  async findAll(): Promise<IApiResponse<any>> {
    const allInstitutions = await this.institutionsService.findAll();
    return {
      message: SUCCESSFUL_FETCH,
      data: allInstitutions,
      records: allInstitutions.length,
    };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${READ_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: Institution,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @HttpCode(200)
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const institution = await this.institutionsService.findOne(id);
    return { message: SUCCESSFUL_FETCH, data: institution };
  }

  @UserRoles(UserRole.ADMINISTRATOR)
  @ApiOperation({ summary: `${UPDATE_RECORD} Only: ${UserRole.ADMINISTRATOR}` })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_UPDATE,
    type: Institution,
  })
  @ApiResponse({ status: 403, description: FORBIDDEN_RESOURCE })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 409, description: CONFLICT_ERROR })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const updatedInstitution = await this.institutionsService.update(
      id,
      updateInstitutionDto,
      user,
    );
    return { message: SUCCESSFUL_UPDATE, data: updatedInstitution };
  }

  @UserRoles(UserRole.ADMINISTRATOR)
  @ApiOperation({ summary: `${REMOVE_RECORD} Only: ${UserRole.ADMINISTRATOR}` })
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
    const deletedInstitution = await this.institutionsService.remove(id, user);
    return { message: SUCCESSFUL_DELETION, data: deletedInstitution };
  }

  @UserRoles(UserRole.ADMINISTRATOR)
  @ApiOperation({
    summary: `${REMOVE_ALL_RECORDS} Only: ${UserRole.ADMINISTRATOR}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_DELETION,
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Delete()
  async removeAll(@Req() req): Promise<IApiResponse<any>> {
    const user = req.user;
    const removedInstitutions = await this.institutionsService.removeAll(user);
    return { message: SUCCESSFUL_DELETION, data: removedInstitutions };
  }
}
