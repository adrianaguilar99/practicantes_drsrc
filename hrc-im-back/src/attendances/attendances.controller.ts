import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Public, UserRoles } from 'src/auth/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  BAD_REQUEST,
  CONFLICT_ERROR,
  CREATE_RECORD,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  PUBLIC_ROUTE,
} from 'src/common/constants/constants';
import { Attendance } from './entities/attendance.entity';
import { UserRole } from 'src/common/enums';
import { IApiResponse } from 'src/common/interfaces';
import { InternsService } from 'src/interns/interns.service';
import { RegisterAttendance } from './decorators';

@ApiTags('Attendances')
@Controller('attendances')
export class AttendancesController {
  constructor(
    private readonly attendancesService: AttendancesService,
    private readonly internsService: InternsService,
  ) {}

  @Public()
  @Post('register')
  @HttpCode(201)
  @RegisterAttendance()
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
    @Body() { internCode }: { internCode: string },
  ): Promise<IApiResponse<any>> {
    const date = new Date();

    const existingRecord = await this.attendancesService.findAttendanceRecord(
      internCode,
      date.toDateString(),
    );
    if (existingRecord && !existingRecord.exitTime) {
      await this.attendancesService.registerExit(internCode, date);
      return { message: 'Successful attendance' };
    }

    await this.attendancesService.registerEntry(internCode, date);
    return { message: 'Successful entry' };
  }

  @Get()
  findAll() {
    return this.attendancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.attendancesService.findOne(id);
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendancesService.update(id, updateAttendanceDto);
  }

  // @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  // @Delete(':id')
  // remove(@Param('id', ParseUUIDPipe) id: string) {
  //   return this.attendancesService.remove(id);
  // }
}
