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
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
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
import { Property } from './entities/property.entity';

@UserRoles(UserRole.ADMINISTRATOR)
@ApiTags('Properties')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @ApiOperation({ summary: CREATE_RECORD })
  @ApiResponse({
    status: 201,
    description: SUCCESSFUL_CREATION,
    type: Property,
  })
  @ApiResponse({ status: 409, description: CONFLICT_ERROR })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(201)
  @Post()
  async create(
    @Body() createPropertyDto: CreatePropertyDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const createdProperty = await this.propertiesService.create(
      createPropertyDto,
      user,
    );
    return { message: SUCCESSFUL_CREATION, data: createdProperty };
  }

  @ApiOperation({ summary: READ_ALL_RECORDS })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: [Property],
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Get()
  async findAll(): Promise<IApiResponse<any>> {
    const allProperties = await this.propertiesService.findAll();
    return {
      message: SUCCESSFUL_FETCH,
      data: allProperties,
      records: allProperties.length,
    };
  }

  @ApiOperation({ summary: READ_RECORD })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: Property,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @HttpCode(200)
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const property = await this.propertiesService.findOne(id);
    return { message: SUCCESSFUL_FETCH, data: property };
  }

  @ApiOperation({ summary: UPDATE_RECORD })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_UPDATE,
    type: Property,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 409, description: CONFLICT_ERROR })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const updatedProperty = await this.propertiesService.update(
      id,
      updatePropertyDto,
      user,
    );
    return { message: SUCCESSFUL_UPDATE, data: updatedProperty };
  }

  @ApiOperation({ summary: REMOVE_RECORD })
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
    const deletedProperty = await this.propertiesService.remove(id, user);
    return { message: SUCCESSFUL_DELETION, data: deletedProperty };
  }

  @ApiOperation({ summary: REMOVE_ALL_RECORDS })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_DELETION,
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Delete()
  async removeAll(): Promise<IApiResponse<any>> {
    await this.propertiesService.removeAll();
    return { message: SUCCESSFUL_DELETION };
  }
}
