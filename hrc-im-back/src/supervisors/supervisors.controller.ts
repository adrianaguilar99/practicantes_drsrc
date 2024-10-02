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
import { SupervisorsService } from './supervisors.service';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';
import { UserRoles } from 'src/auth/decorators';
import { UserRole } from 'src/common/enums';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UNAUTHORIZED_ACCESS } from 'src/common/constants/constants';
import { IApiResponse } from 'src/common/interfaces';

@ApiTags('Supervisors')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@Controller('supervisors')
export class SupervisorsController {
  constructor(private readonly supervisorsService: SupervisorsService) {}

  @UserRoles(UserRole.ADMINISTRATOR)
  @Post()
  async create(
    @Body() createSupervisorDto: CreateSupervisorDto,
  ): Promise<IApiResponse<any>> {
    const createdSupervisor =
      await this.supervisorsService.create(createSupervisorDto);
    return;
  }

  @UserRoles(
    UserRole.ADMINISTRATOR,
    UserRole.SUPERVISOR,
    UserRole.SUPERVISOR_RH,
  )
  @Get()
  async findAll(): Promise<IApiResponse<any>> {
    const allSupervisors = await this.supervisorsService.findAll();
    return;
  }

  @UserRoles(
    UserRole.ADMINISTRATOR,
    UserRole.SUPERVISOR,
    UserRole.SUPERVISOR_RH,
  )
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const supervisor = await this.supervisorsService.findOne(id);
    return;
  }

  @UserRoles(
    UserRole.ADMINISTRATOR,
    UserRole.SUPERVISOR,
    UserRole.SUPERVISOR_RH,
  )
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSupervisorDto: UpdateSupervisorDto,
  ): Promise<IApiResponse<any>> {
    const updatedSupervisor = await this.supervisorsService.update(
      id,
      updateSupervisorDto,
    );
    return;
  }

  @UserRoles(UserRole.ADMINISTRATOR)
  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const removedSupervisor = await this.supervisorsService.remove(id);
    return;
  }
}
