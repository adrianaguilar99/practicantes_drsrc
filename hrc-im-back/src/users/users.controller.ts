import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  Req,
  HttpCode,
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
  READ_ALL_RECORDS,
  READ_RECORD,
  REMOVE_ALL_RECORDS,
  REMOVE_RECORD,
  SUCCESSFUL_ALL_MARKED_DELETED,
  SUCCESSFUL_CREATION,
  SUCCESSFUL_FETCH,
  SUCCESSFUL_MARKED_DELETED,
  UNAUTHORIZED_ACCESS,
  USER_REGISTERED,
} from 'src/common/constants/constants';
import { User } from './entities/user.entity';
import { UserRole } from 'src/common/enums';
import { IApiResponse } from 'src/common/interfaces/response.interface';

@ApiTags('Users')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UserRoles(UserRole.ADMINISTRATOR)
  @ApiOperation({ summary: CREATE_RECORD })
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
  ): Promise<IApiResponse<any>> {
    const createdUser = await this.usersService.create(createUserDto);
    return { message: USER_REGISTERED, data: createdUser };
  }

  @ApiOperation({ summary: READ_ALL_RECORDS })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: [User],
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Get()
  async findAll(): Promise<IApiResponse<any>> {
    const allUsers = await this.usersService.findAll();
    return {
      message: SUCCESSFUL_FETCH,
      data: allUsers,
      records: allUsers.length,
    };
  }

  // @ApiOperation({ summary: READ_ALL_RECORDS_PAGINATED })
  // @ApiResponse({
  //   status: 200,
  //   description: SUCCESSFUL_FETCH,
  //   type: [User],
  // })
  // @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  // @HttpCode(200)
  // @Get('paginated')
  // async findAllPaginated(
  //   @Query() paginationDto: PaginationDto,
  // ): Promise<IApiResponse<any>> {
  //   const paginatedUsers =
  //     await this.usersService.findAllPaginated(paginationDto);
  //   return {
  //     message: SUCCESSFUL_FETCH,
  //     data: paginatedUsers,
  //     records: paginatedUsers.length,
  //   };
  // }

  @ApiOperation({ summary: READ_RECORD })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: User,
  })
  @ApiResponse({ status: 404, description: BAD_REQUEST })
  @HttpCode(200)
  @Get('profile')
  async getProfile(@Req() req): Promise<IApiResponse<any>> {
    const user = await this.usersService.findByEmail(req.user.id);
    const { password, ...userWithoutPassword } = user;
    return {
      message: SUCCESSFUL_FETCH,
      data: userWithoutPassword,
    };
  }

  @ApiOperation({ summary: READ_RECORD })
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

  @UserRoles(UserRole.ADMINISTRATOR)
  @ApiOperation({ summary: REMOVE_RECORD })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_MARKED_DELETED,
    type: User,
  })
  @ApiResponse({ status: 403, description: FORBIDDEN_RESOURCE })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const userRemoved = await this.usersService.remove(id);
    return { message: SUCCESSFUL_MARKED_DELETED, data: userRemoved };
  }

  @ApiOperation({ summary: REMOVE_ALL_RECORDS })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_ALL_MARKED_DELETED,
    type: User,
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Delete()
  async removeAll(): Promise<IApiResponse<any>> {
    await this.usersService.removeAll();
    return { message: SUCCESSFUL_ALL_MARKED_DELETED };
  }
}
