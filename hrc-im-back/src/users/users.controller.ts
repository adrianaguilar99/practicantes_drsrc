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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public, UserRoles } from 'src/auth/decorators';
import {
  SUCCESSFUL_DELETION,
  SUCCESSFUL_FETCH,
  USER_REGISTERED,
} from 'src/common/constants/constants';
import { IApiResponse, PaginationDto, UserRole } from 'src/common';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IApiResponse<any>> {
    const createdUser = await this.usersService.create(createUserDto);
    return { message: USER_REGISTERED, data: createdUser };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<IApiResponse<any>> {
    const allUsers = await this.usersService.findAll();
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
  ): Promise<IApiResponse<any>> {
    const paginatedUsers =
      await this.usersService.findAllPaginated(paginationDto);
    return {
      message: SUCCESSFUL_FETCH,
      data: paginatedUsers,
      records: paginatedUsers.length,
    };
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req): Promise<IApiResponse<any>> {
    const user = await this.usersService.findByEmail(req.user.id);
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
  ): Promise<IApiResponse<any>> {
    const user = await this.usersService.findOne(id);
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
  ): Promise<IApiResponse<any>> {
    const userRemoved = await this.usersService.remove(id);
    return { message: SUCCESSFUL_DELETION, data: userRemoved };
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async removeAll(): Promise<IApiResponse<any>> {
    const usersRemoved = await this.usersService.removeAllUsers();
    return { message: SUCCESSFUL_DELETION, data: usersRemoved };
  }
}
