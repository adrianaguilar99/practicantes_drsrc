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
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Public, UserRoles } from 'src/auth/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import {
  SUCCESSFUL_DELETION,
  SUCCESSFUL_FETCH,
  USER_REGISTERED,
} from 'src/common/constants/constants';
import { ApiResponse } from 'src/common/interfaces/response.interface';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<any>> {
    const createdUser = await this.userService.create(createUserDto);
    return { message: USER_REGISTERED, data: createdUser };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<ApiResponse<any>> {
    const allUsers = await this.userService.findAll();
    return {
      message: SUCCESSFUL_FETCH,
      data: allUsers,
      records: allUsers.length,
    };
  }

  @Get('paginated')
  @HttpCode(HttpStatus.OK)
  async findAllPaginated(
    @Query() paginationDto: PaginationDto,
  ): Promise<ApiResponse<any>> {
    const paginatedUsers =
      await this.userService.findAllPaginated(paginationDto);
    return {
      message: SUCCESSFUL_FETCH,
      data: paginatedUsers,
      records: paginatedUsers.length,
    };
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req): Promise<ApiResponse<any>> {
    const user = await this.userService.findByEmail(req.user.id);
    const { password, ...userWithoutPassword } = user;
    return {
      message: SUCCESSFUL_FETCH,
      data: userWithoutPassword,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ApiResponse<any>> {
    const user = await this.userService.findOne(id);
    return {
      message: SUCCESSFUL_FETCH,
      data: user,
    };
  }

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ApiResponse<any>> {
    const userRemoved = await this.userService.remove(id);
    return { message: SUCCESSFUL_DELETION, data: userRemoved };
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async removeAll(): Promise<ApiResponse<any>> {
    const usersRemoved = await this.userService.removeAllUsers();
    return { message: SUCCESSFUL_DELETION, data: usersRemoved };
  }
}
