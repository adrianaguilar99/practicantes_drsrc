import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Public, UserRoles } from 'src/auth/decorators';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ACCESS_TO_ALL,
  BAD_REQUEST,
  CONFLICT_ERROR,
  CREATE_RECORD,
  FORBIDDEN_RESOURCE,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  PUBLIC_ROUTE,
  READ_ALL_RECORDS,
  READ_RECORD,
  SUCCESSFUL_FETCH,
  SUCCESSFUL_UPDATE,
  UNAUTHORIZED_ACCESS,
  UPDATE_RECORD,
} from 'src/common/constants/constants';
import { Attendance } from './entities/attendance.entity';
import { UserRole } from 'src/common/enums';
import { IApiResponse } from 'src/common/interfaces';

@ApiTags('Attendances')
@Controller('attendances')
export class AttendancesController {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Public()
  @Post(':internCode/register')
  @HttpCode(201)
  @ApiOperation({ summary: `${CREATE_RECORD} ${PUBLIC_ROUTE}` })
  @ApiResponse({
    status: 201,
    description: `${CREATE_RECORD} Creation of the practitioner's assistance.`,
    type: Attendance,
  })
  @ApiResponse({ status: 400, description: BAD_REQUEST })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({
    status: 409,
    description: `${CONFLICT_ERROR}`,
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async registerAttendance(
    @Param('internCode') internCode: string,
  ): Promise<IApiResponse<any>> {
    const date = new Date();
    const offsetInMs = date.getTimezoneOffset() * 60000;
    const localTimestamp = date.getTime() - offsetInMs;

    // console.log({
    //   local: new Date(localTimestamp).toISOString(),
    //   localTimestamp,
    //   localDate: new Date(localTimestamp),
    // });

    const existingRecord = await this.attendancesService.findAttendanceRecord(
      internCode,
      new Date(localTimestamp).toISOString(),
    );

    if (existingRecord && !existingRecord.exitTime) {
      const registeredExit = await this.attendancesService.registerExit(
        internCode,
        new Date(localTimestamp),
      );
      return { message: registeredExit };
    }

    const registeredEntry = await this.attendancesService.registerEntry(
      internCode,
      new Date(localTimestamp),
    );
    return { message: registeredEntry };
  }

  @Get()
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({
    summary: `${READ_ALL_RECORDS} ${ACCESS_TO_ALL}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: [Attendance],
  })
  @ApiResponse({
    status: 401,
    description: `${UNAUTHORIZED_ACCESS} Please login`,
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async findAll(@Req() req): Promise<IApiResponse<any>> {
    const user = req.user;
    const allAttendances = await this.attendancesService.findAll(user);
    return {
      message: 'SUCCESSFUL_FETCH',
      data: allAttendances,
      records: allAttendances.length,
    };
  }

  @Get(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({
    summary: `${READ_RECORD} ${ACCESS_TO_ALL}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: Attendance,
  })
  @ApiResponse({
    status: 401,
    description: `${UNAUTHORIZED_ACCESS} Please login`,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const attendance = await this.attendancesService.findOne(id);
    return { message: SUCCESSFUL_FETCH, data: attendance };
  }

  @Get(':id/intern')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({
    summary: `${READ_ALL_RECORDS} ${ACCESS_TO_ALL}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: [Attendance],
  })
  @ApiResponse({
    status: 401,
    description: `${UNAUTHORIZED_ACCESS} Please login`,
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async findAllByInternId(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const allAttendances = await this.attendancesService.findAllByInternId(id);
    return {
      message: SUCCESSFUL_FETCH,
      data: allAttendances,
      records: allAttendances.length,
    };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @Patch(':id')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({
    summary: `${UPDATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_UPDATE,
    type: Attendance,
  })
  @ApiResponse({ status: 400, description: BAD_REQUEST })
  @ApiResponse({
    status: 401,
    description: `${UNAUTHORIZED_ACCESS} Please login`,
  })
  @ApiResponse({ status: 403, description: FORBIDDEN_RESOURCE })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 409, description: CONFLICT_ERROR })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const updatedAttendance = await this.attendancesService.update(
      id,
      updateAttendanceDto,
      user,
    );
    return { message: SUCCESSFUL_UPDATE, data: updatedAttendance };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @Patch(':id/resetExit')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({
    summary: `Reset intern's exit. Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_UPDATE,
    type: Attendance,
  })
  @ApiResponse({ status: 400, description: BAD_REQUEST })
  @ApiResponse({
    status: 401,
    description: `${UNAUTHORIZED_ACCESS} Please login`,
  })
  @ApiResponse({ status: 403, description: FORBIDDEN_RESOURCE })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async resetExit(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const resetInternExit = await this.attendancesService.resetExit(id, user);
    return { message: SUCCESSFUL_UPDATE, data: resetInternExit };
  }
}
