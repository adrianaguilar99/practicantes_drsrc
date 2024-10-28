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
import { InternCommentsService } from './intern-comments.service';
import { CreateInternCommentDto } from './dto/create-intern-comment.dto';
import { UpdateInternCommentDto } from './dto/update-intern-comment.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
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
import { InternComment } from './entities/intern-comment.entity';
import { IApiResponse } from 'src/common/interfaces';

@ApiTags('Intern Comments')
@UserRoles(UserRole.ADMINISTRATOR, UserRole.SUPERVISOR_RH, UserRole.SUPERVISOR)
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@ApiResponse({ status: 403, description: FORBIDDEN_RESOURCE })
@Controller('intern-comments')
export class InternCommentsController {
  constructor(private readonly internCommentsService: InternCommentsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({
    summary: `${CREATE_RECORD} Only: ${UserRole.ADMINISTRATOR}, ${UserRole.SUPERVISOR_RH} and ${UserRole.SUPERVISOR}`,
  })
  @ApiResponse({
    status: 201,
    description: SUCCESSFUL_CREATION,
    type: InternComment,
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async create(
    @Body() createInternCommentDto: CreateInternCommentDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const createdInternComment = await this.internCommentsService.create(
      createInternCommentDto,
      user,
    );
    return { message: SUCCESSFUL_CREATION, data: createdInternComment };
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: `${READ_ALL_RECORDS} Only: ${UserRole.ADMINISTRATOR}, ${UserRole.SUPERVISOR_RH} and ${UserRole.SUPERVISOR}`,
  })
  @ApiResponse({
    status: 201,
    description: SUCCESSFUL_FETCH,
    type: [InternComment],
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async findAll(): Promise<IApiResponse<any>> {
    const allInternComments = await this.internCommentsService.findAll();
    return { message: SUCCESSFUL_FETCH, data: allInternComments };
  }

  @Get(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: `${READ_RECORD} Only: ${UserRole.ADMINISTRATOR}, ${UserRole.SUPERVISOR_RH} and ${UserRole.SUPERVISOR}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: InternComment,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const internComment = await this.internCommentsService.findOne(id);
    return { message: SUCCESSFUL_FETCH, data: internComment };
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: `${UPDATE_RECORD} Only: ${UserRole.ADMINISTRATOR}, ${UserRole.SUPERVISOR_RH} and ${UserRole.SUPERVISOR}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_UPDATE,
    type: InternComment,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInternCommentDto: UpdateInternCommentDto,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const updatedInternComment = await this.internCommentsService.update(
      id,
      updateInternCommentDto,
      user,
    );
    return { message: SUCCESSFUL_UPDATE, data: updatedInternComment };
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({
    summary: `${REMOVE_RECORD} Only: ${UserRole.ADMINISTRATOR}, ${UserRole.SUPERVISOR_RH} and ${UserRole.SUPERVISOR}`,
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
    const deletedInternComment = await this.internCommentsService.remove(
      id,
      user,
    );
    return { message: SUCCESSFUL_DELETION, data: deletedInternComment };
  }
}
