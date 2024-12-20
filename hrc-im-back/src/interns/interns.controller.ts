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
  Req,
} from '@nestjs/common';
import { InternsService } from './interns.service';
import { CreateInternDto } from './dto/create-intern.dto';
import { UpdateInternDto } from './dto/update-intern.dto';
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
import { UserRoles } from 'src/auth/decorators';
import { UserRole } from 'src/common/enums';
import { Intern } from './entities/intern.entity';
import { IApiResponse } from 'src/common/interfaces';

@ApiTags('Interns')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@ApiResponse({ status: 403, description: FORBIDDEN_RESOURCE })
@Controller('interns')
export class InternsController {
  constructor(private readonly internsService: InternsService) {}

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: `${CREATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 201,
    description: SUCCESSFUL_CREATION,
    type: Intern,
  })
  @ApiResponse({ status: 400, description: BAD_REQUEST })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: CONFLICT_ERROR })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async create(
    @Body() createInternDto: CreateInternDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const createdIntern = await this.internsService.create(
      createInternDto,
      user,
    );
    return { message: SUCCESSFUL_CREATION, data: createdIntern };
  }

  @UserRoles(
    UserRole.ADMINISTRATOR,
    UserRole.SUPERVISOR,
    UserRole.SUPERVISOR_RH,
  )
  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: `${READ_ALL_RECORDS} Only: ${UserRole.ADMINISTRATOR}, ${UserRole.SUPERVISOR_RH} and ${UserRole.SUPERVISOR}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: [Intern],
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async findAll(@Req() req): Promise<IApiResponse<any>> {
    const user = req.user;
    // console.log(user);

    const allInterns = await this.internsService.findAll(user);
    return {
      message: SUCCESSFUL_FETCH,
      data: allInterns,
      records: allInterns.length,
    };
  }

  @UserRoles(
    UserRole.ADMINISTRATOR,
    UserRole.SUPERVISOR_RH,
    UserRole.SUPERVISOR,
  )
  @Get('intern-count')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get the number of interns by department' })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
  })
  async getInternCountByDepartment(): Promise<
    IApiResponse<Record<string, number>>
  > {
    const internCount =
      await this.internsService.countInternsByInternshipDepartment();
    return {
      message: SUCCESSFUL_FETCH,
      data: internCount,
    };
  }

  @UserRoles(
    UserRole.ADMINISTRATOR,
    UserRole.SUPERVISOR,
    UserRole.SUPERVISOR_RH,
  )
  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: `${READ_RECORD} Only: ${UserRole.ADMINISTRATOR}, ${UserRole.SUPERVISOR_RH} and ${UserRole.SUPERVISOR}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: Intern,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const intern = await this.internsService.findOne(id);
    return { message: SUCCESSFUL_FETCH, data: intern };
  }

  @ApiOperation({
    summary: `${READ_RECORD} Retrieve the intern associated with the given user ID. ${ACCESS_TO_ALL}`,
  })
  @Get(':id/user')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: Intern,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  async findOneByUserId(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const intern = await this.internsService.findOneByUserId(id);
    return { message: SUCCESSFUL_FETCH, data: intern };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${UPDATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_UPDATE,
    type: Intern,
  })
  @ApiResponse({ status: 400, description: BAD_REQUEST })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 409, description: CONFLICT_ERROR })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInternDto: UpdateInternDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const updatedIntern = await this.internsService.update(
      id,
      updateInternDto,
      user,
    );
    return { message: SUCCESSFUL_UPDATE, data: updatedIntern };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${REMOVE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
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
    const deletedIntern = await this.internsService.remove(id, user);
    return { message: SUCCESSFUL_DELETION, data: deletedIntern };
  }
}
