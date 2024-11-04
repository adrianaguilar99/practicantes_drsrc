import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Req,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRoles } from 'src/auth/decorators';
import {
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
  SUCCESSFUL_MARKED_ACTIVE,
  SUCCESSFUL_MARKED_DEACTIVE,
  SUCCESSFUL_UPDATE,
  UNAUTHORIZED_ACCESS,
  UPDATE_RECORD,
  USER_REGISTERED,
} from 'src/common/constants/constants';
import { User } from './entities/user.entity';
import { UserRole } from 'src/common/enums';
import { IApiResponse } from 'src/common/interfaces/response.interface';
import { IRequestUser } from 'src/common/interfaces';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${CREATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 201,
    description: SUCCESSFUL_CREATION,
    type: User,
  })
  @ApiResponse({ status: 403, description: FORBIDDEN_RESOURCE })
  @ApiResponse({ status: 409, description: CONFLICT_ERROR })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(201)
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const createdUser = await this.usersService.create(createUserDto, user);
    return { message: USER_REGISTERED, data: createdUser };
  }

  @UserRoles(
    UserRole.ADMINISTRATOR,
    UserRole.SUPERVISOR,
    UserRole.SUPERVISOR_RH,
  )
  @ApiOperation({
    summary: `${READ_ALL_RECORDS} Only: ${UserRole.ADMINISTRATOR}, ${UserRole.SUPERVISOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: [User],
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Get()
  async findAll(@Req() req): Promise<IApiResponse<any>> {
    const user = req.user;
    const allUsers = await this.usersService.findAll(user);
    return {
      message: SUCCESSFUL_FETCH,
      data: allUsers,
      records: allUsers.length,
    };
  }

  @UserRoles(UserRole.ADMINISTRATOR)
  @ApiOperation({
    summary: `${READ_ALL_RECORDS} Use to find all administrators. Only: ${UserRole.ADMINISTRATOR}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: [User],
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Get('admins')
  async findAdmins(): Promise<IApiResponse<any>> {
    const allUsers = await this.usersService.findAdmins();
    return {
      message: SUCCESSFUL_FETCH,
      data: allUsers,
      records: allUsers.length,
    };
  }

  @ApiOperation({
    summary:
      'Action to obtain your profile data using the authentication token.',
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: User,
  })
  @ApiResponse({ status: 404, description: BAD_REQUEST })
  @HttpCode(200)
  @Get('profile')
  async getProfile(@Req() req): Promise<IApiResponse<any>> {
    const { userId }: IRequestUser = req.user;
    // console.log({ user: req.user });

    const user = await this.usersService.findOne(userId);
    return {
      message: SUCCESSFUL_FETCH,
      data: user,
    };
  }

  @UserRoles(
    UserRole.ADMINISTRATOR,
    UserRole.SUPERVISOR,
    UserRole.SUPERVISOR_RH,
  )
  @ApiOperation({
    summary: `${READ_RECORD} Only: ${[UserRole.ADMINISTRATOR]}, ${UserRole.SUPERVISOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: User,
  })
  @ApiResponse({ status: 404, description: BAD_REQUEST })
  @HttpCode(200)
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const user = await this.usersService.findOne(id);
    return {
      message: SUCCESSFUL_FETCH,
      data: user,
    };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${UPDATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: User,
  })
  @ApiResponse({ status: 404, description: BAD_REQUEST })
  @HttpCode(200)
  @Get(':id/unfiltered')
  async findOneRegardlessStatus(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const user = await this.usersService.findOneRegardlessStatus(id);
    return {
      message: SUCCESSFUL_FETCH,
      data: user,
    };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${UPDATE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_UPDATE,
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: `${BAD_REQUEST} Please verify your data.`,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({
    status: 409,
    description: `${CONFLICT_ERROR} Not allowed some properties to update.`,
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInternDto: UpdateUserDto,
    @Req() req,
  ) {
    const user = req.user;
    const updatedIntern = await this.usersService.update(
      id,
      updateInternDto,
      user,
    );
    return { message: SUCCESSFUL_UPDATE, data: updatedIntern };
  }

  @UserRoles(UserRole.ADMINISTRATOR)
  @ApiOperation({
    summary: `${UPDATE_RECORD} Only: ${UserRole.ADMINISTRATOR}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_MARKED_ACTIVE,
    type: User,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Patch(':id/active')
  async active(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    const user = req.user;
    const updatedIntern = await this.usersService.active(id, user);
    return { message: SUCCESSFUL_MARKED_ACTIVE, data: updatedIntern };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${REMOVE_RECORD} Only: ${UserRole.ADMINISTRATOR} and ${UserRole.SUPERVISOR_RH}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_MARKED_DEACTIVE,
    type: User,
  })
  @ApiResponse({ status: 403, description: FORBIDDEN_RESOURCE })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Delete(':id/deactive')
  async deactivate(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const removedUser = await this.usersService.deactivate(id, user);
    return {
      message: `${SUCCESSFUL_MARKED_DEACTIVE} User marked as inactive, check with the database administrator to reactivate it.`,
      data: removedUser,
    };
  }

  @Delete(':id/physicalRemove')
  @HttpCode(200)
  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH)
  @ApiOperation({
    summary: `${REMOVE_RECORD} Only: ${[UserRole.ADMINISTRATOR]}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_DELETION,
    type: User,
  })
  @ApiResponse({ status: 403, description: FORBIDDEN_RESOURCE })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const removedUser = await this.usersService.physicalRemove(id, user);
    return {
      message: `${SUCCESSFUL_DELETION}`,
      data: removedUser,
    };
  }
}
