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
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { UserRoles } from 'src/auth/decorators';
import { UserRole } from 'src/common/enums';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UNAUTHORIZED_ACCESS } from 'src/common/constants/constants';
import { IApiResponse } from 'src/common/interfaces';

@UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
@ApiTags('Properties')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  async create(
    @Body() createPropertyDto: CreatePropertyDto,
  ): Promise<IApiResponse<any>> {
    const createdProperty =
      await this.propertiesService.create(createPropertyDto);
    return;
  }

  @Get()
  async findAll(): Promise<IApiResponse<any>> {
    const allProperties = await this.propertiesService.findAll();
    return;
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const property = await this.propertiesService.findOne(id);
    return;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<IApiResponse<any>> {
    const updatedProperty = await this.propertiesService.update(
      id,
      updatePropertyDto,
    );
    return;
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const removedProperty = await this.propertiesService.remove(id);
    return;
  }
}
