import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Public, UserRoles } from 'src/auth/decorators';
import { UserRole } from 'src/common/enums/user-role.enum';
import { JwtAuthGuard } from 'src/auth/guards';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('paginated')
  findAllPaginated(@Query() paginationDto: PaginationDto) {
    return this.userService.findAllPaginated(paginationDto);
  }

  // TODO --> ELIMINAR ESTE ENDPOINT EJEMPLO: SOLO USUARIOS AUTENTIFICADOS PUEDEN ACCEDER MEDIANTE JwtAuthGuard
  @UseGuards(JwtAuthGuard)
  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR)
  @Get('profile')
  getProfile(@Req() req) {
    return this.userService.findOne(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOne(id);
  }

  // @SetMetadata('role', [UserRole.ADMINISTRATOR])
  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.remove(id);
  }

  @Delete()
  removeAll() {
    return this.userService.removeAllUsers();
  }
}
