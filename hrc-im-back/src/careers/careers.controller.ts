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
import { CareersService } from './careers.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from 'src/common/enums';
import { UserRoles } from 'src/auth/decorators';
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
import { Career } from './entities/career.entity';
import { IApiResponse } from 'src/common/interfaces/response.interface';

@ApiTags('Careers')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: `${CREATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({ status: 201, description: SUCCESSFUL_CREATION, type: Career })
  @ApiResponse({ status: 403, description: FORBIDDEN_RESOURCE })
  @ApiResponse({ status: 409, description: CONFLICT_ERROR })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async create(
    @Body() createCareerDto: CreateCareerDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const createdCareer = await this.careersService.create(
      createCareerDto,
      user,
    );
    return { message: SUCCESSFUL_CREATION, data: createdCareer };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: `${READ_ALL_RECORDS} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({ status: 200, description: SUCCESSFUL_FETCH, type: [Career] })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async findAll(): Promise<IApiResponse<any>> {
    const allCareers = await this.careersService.findAll();
    return {
      message: SUCCESSFUL_FETCH,
      data: allCareers,
      records: allCareers.length,
    };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: `${READ_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: Career,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const career = await this.careersService.findOne(id);
    return { message: SUCCESSFUL_FETCH, data: career };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: `${UPDATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_UPDATE,
    type: Career,
  })
  @ApiResponse({ status: 403, description: FORBIDDEN_RESOURCE })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 409, description: CONFLICT_ERROR })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCareerDto: UpdateCareerDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const updatedCareer = await this.careersService.update(
      id,
      updateCareerDto,
      user,
    );
    return { message: SUCCESSFUL_UPDATE, data: updatedCareer };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: `${REMOVE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_DELETION,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const deletedCareer = await this.careersService.remove(id, user);
    return { message: SUCCESSFUL_DELETION, data: deletedCareer };
  }

  @UserRoles(UserRole.ADMINISTRATOR)
  @Delete()
  @HttpCode(200)
  @ApiOperation({
    summary: `${REMOVE_ALL_RECORDS} Only: ${UserRole.ADMINISTRATOR}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_DELETION,
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async removeAll(@Req() req): Promise<IApiResponse<any>> {
    const user = req.user;
    const removedCareers = await this.careersService.removeAll(user);
    return { message: SUCCESSFUL_DELETION, data: removedCareers };
  }
}
