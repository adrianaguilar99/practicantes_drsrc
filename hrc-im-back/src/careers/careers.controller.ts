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
} from '@nestjs/common';
import { CareersService } from './careers.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/common/enums';
import { UserRoles } from 'src/auth/decorators';
import { User } from 'src/users/entities/user.entity';

@ApiTags('Careers')
@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR)
  @Post()
  async create(@Body() createCareerDto: CreateCareerDto, @Req() req) {
    const user: User = req.user;
    return await this.careersService.create(createCareerDto, user);
  }

  @Get()
  findAll() {
    return this.careersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.careersService.findOne(id);
  }
  @UserRoles(UserRole.ADMINISTRATOR)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCareerDto: UpdateCareerDto,
    @Req() req,
  ) {
    const user: User = req.user;
    console.log(user);
    return this.careersService.update(id, updateCareerDto, user);
  }

  @UserRoles(UserRole.ADMINISTRATOR)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @Req() req) {
    const user: User = req.user;
    return this.careersService.remove(id, user);
  }
}
