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
import { InternScheduleService } from './intern-schedule.service';
import { CreateInternScheduleDto } from './dto/create-intern-schedule.dto';
import { UpdateInternScheduleDto } from './dto/update-intern-schedule.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRoles } from 'src/auth/decorators';
import { UserRole } from 'src/common/enums';
import {
  BAD_REQUEST,
  CREATE_RECORD,
  FORBIDDEN_RESOURCE,
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
import { InternSchedule } from './entities/intern-schedule.entity';
import { IApiResponse } from 'src/common/interfaces';

@ApiTags('Intern Schedule')
@UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@ApiResponse({ status: 403, description: FORBIDDEN_RESOURCE })
@Controller('intern-schedule')
export class InternScheduleController {
  constructor(private readonly internScheduleService: InternScheduleService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: `${CREATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 201,
    description: SUCCESSFUL_CREATION,
    type: InternSchedule,
  })
  @ApiResponse({ status: 400, description: BAD_REQUEST })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @Post()
  async create(
    @Body() createInternScheduleDto: CreateInternScheduleDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const createdInternSchedule = await this.internScheduleService.create(
      createInternScheduleDto,
      user,
    );
    return { message: SUCCESSFUL_CREATION, data: createdInternSchedule };
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: `${READ_ALL_RECORDS} Only: ${UserRole.ADMINISTRATOR}, ${UserRole.SUPERVISOR_RH} and ${UserRole.SUPERVISOR}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: [InternSchedule],
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async findAll(): Promise<IApiResponse<any>> {
    const allInternSchedules = await this.internScheduleService.findAll();
    return {
      message: SUCCESSFUL_FETCH,
      data: allInternSchedules,
      records: allInternSchedules.length,
    };
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: `${READ_RECORD} Only: ${UserRole.ADMINISTRATOR}, ${UserRole.SUPERVISOR_RH} and ${UserRole.SUPERVISOR}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: InternSchedule,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const internSchedule = await this.internScheduleService.findOneByIntern(id);
    return { message: SUCCESSFUL_FETCH, data: internSchedule };
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: `${UPDATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_UPDATE,
    type: InternSchedule,
  })
  @ApiResponse({ status: 400, description: BAD_REQUEST })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInternScheduleDto: UpdateInternScheduleDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const updatedInternSchedule = await this.internScheduleService.update(
      id,
      updateInternScheduleDto,
      user,
    );
    return { message: SUCCESSFUL_UPDATE, data: updatedInternSchedule };
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: `${REMOVE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_DELETION,
  })
  @ApiResponse({ status: 400, description: BAD_REQUEST })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const deletedInternSchedule = await this.internScheduleService.remove(
      id,
      user,
    );
    return { message: SUCCESSFUL_DELETION, data: deletedInternSchedule };
  }
}
