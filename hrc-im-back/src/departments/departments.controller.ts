import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { UserRoles } from 'src/auth/decorators';
import { UserRole } from 'src/common/enums';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UNAUTHORIZED_ACCESS } from 'src/common/constants/constants';
import { IApiResponse } from 'src/common/interfaces';

@UserRoles(UserRole.ADMINISTRATOR)
@ApiTags('Departments')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<IApiResponse<any>> {
    const createdDepartment =
      await this.departmentsService.create(createDepartmentDto);
    return;
  }

  @Get()
  async findAll(): Promise<IApiResponse<any>> {
    const allDepartments = await this.departmentsService.findAll();
    return;
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const department = await this.departmentsService.findOne(id);
    return;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<IApiResponse<any>> {
    const updatedDepartment = await this.departmentsService.update(
      id,
      updateDepartmentDto,
    );
    return;
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const removedDepartment = await this.departmentsService.remove(id);
    return;
  }
}
