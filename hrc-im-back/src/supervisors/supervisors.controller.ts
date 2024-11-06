import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Req,
  HttpCode,
} from '@nestjs/common';
import { SupervisorsService } from './supervisors.service';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';
import { UserRoles } from 'src/auth/decorators';
import { UserRole } from 'src/common/enums';
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
import { IApiResponse } from 'src/common/interfaces';
import { Supervisor } from './entities/supervisor.entity';

@ApiTags('Supervisors')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@Controller('supervisors')
export class SupervisorsController {
  constructor(private readonly supervisorsService: SupervisorsService) {}

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${CREATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 201,
    description: SUCCESSFUL_CREATION,
    type: Supervisor,
  })
  @ApiResponse({ status: 409, description: CONFLICT_ERROR })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(201)
  @Post()
  async create(
    @Body() createSupervisorDto: CreateSupervisorDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const createdSupervisor = await this.supervisorsService.create(
      createSupervisorDto,
      user,
    );
    return { message: SUCCESSFUL_CREATION, data: createdSupervisor };
  }

  @UserRoles(
    UserRole.ADMINISTRATOR,
    UserRole.SUPERVISOR,
    UserRole.SUPERVISOR_RH,
  )
  @ApiOperation({
    summary: `${READ_ALL_RECORDS} Only: ${UserRole.ADMINISTRATOR}, ${UserRole.SUPERVISOR_RH} and ${UserRole.SUPERVISOR}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: [Supervisor],
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Get()
  async findAll(): Promise<IApiResponse<any>> {
    const allSupervisors = await this.supervisorsService.findAll();
    return {
      message: SUCCESSFUL_FETCH,
      data: allSupervisors,
      records: allSupervisors.length,
    };
  }

  @UserRoles(
    UserRole.ADMINISTRATOR,
    UserRole.SUPERVISOR,
    UserRole.SUPERVISOR_RH,
  )
  @ApiOperation({
    summary: `${READ_RECORD} Only: ${UserRole.ADMINISTRATOR}, ${UserRole.SUPERVISOR_RH} and ${UserRole.SUPERVISOR}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: Supervisor,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @HttpCode(200)
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const supervisor = await this.supervisorsService.findOne(id);
    return { message: SUCCESSFUL_FETCH, data: supervisor };
  }

  @UserRoles(
    UserRole.ADMINISTRATOR,
    UserRole.SUPERVISOR,
    UserRole.SUPERVISOR_RH,
  )
  @ApiOperation({
    summary: `${UPDATE_RECORD} Only: ${UserRole.ADMINISTRATOR}, ${UserRole.SUPERVISOR_RH} and ${UserRole.SUPERVISOR}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_UPDATE,
    type: Supervisor,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSupervisorDto: UpdateSupervisorDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const updatedSupervisor = await this.supervisorsService.update(
      id,
      updateSupervisorDto,
      user,
    );
    return { message: SUCCESSFUL_UPDATE, data: updatedSupervisor };
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
    const deletedSupervisor = await this.supervisorsService.remove(id, user);
    return { message: SUCCESSFUL_DELETION, data: deletedSupervisor };
  }
}
