import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Req,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
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
  REMOVE_ALL_RECORDS,
  REMOVE_RECORD,
  SUCCESSFUL_CREATION,
  SUCCESSFUL_DELETION,
  SUCCESSFUL_FETCH,
  SUCCESSFUL_UPDATE,
  UNAUTHORIZED_ACCESS,
  UPDATE_RECORD,
} from 'src/common/constants/constants';
import { IApiResponse } from 'src/common/interfaces';
import { Department } from './entities/department.entity';

@ApiTags('Departments')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @UserRoles(UserRole.ADMINISTRATOR)
  @ApiOperation({
    summary: `${CREATE_RECORD} Only: ${UserRole.ADMINISTRATOR}`,
  })
  @ApiResponse({
    status: 201,
    description: SUCCESSFUL_CREATION,
    type: Department,
  })
  @ApiResponse({ status: 409, description: CONFLICT_ERROR })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(201)
  @Post()
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const createdDepartment = await this.departmentsService.create(
      createDepartmentDto,
      user,
    );
    return { message: SUCCESSFUL_CREATION, data: createdDepartment };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${READ_ALL_RECORDS} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: [Department],
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Get()
  async findAll(): Promise<IApiResponse<any>> {
    const allDepartments = await this.departmentsService.findAll();
    return {
      message: SUCCESSFUL_FETCH,
      data: allDepartments,
      records: allDepartments.length,
    };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${READ_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: Department,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @HttpCode(200)
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const department = await this.departmentsService.findOne(id);
    return { message: SUCCESSFUL_FETCH, data: department };
  }

  @UserRoles(UserRole.ADMINISTRATOR)
  @ApiOperation({ summary: `${UPDATE_RECORD} Only: ${UserRole.ADMINISTRATOR}` })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_UPDATE,
    type: Department,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 409, description: CONFLICT_ERROR })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const updatedDepartment = await this.departmentsService.update(
      id,
      updateDepartmentDto,
      user,
    );
    return { message: SUCCESSFUL_UPDATE, data: updatedDepartment };
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
    const deletedDepartment = await this.departmentsService.remove(id, user);
    return { message: SUCCESSFUL_DELETION, data: deletedDepartment };
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
  async removeAll(): Promise<IApiResponse<any>> {
    await this.departmentsService.removeAll();
    return { message: SUCCESSFUL_DELETION };
  }
}
