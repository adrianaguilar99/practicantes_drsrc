import {
  Controller,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ACCESS_TO_ALL,
  BAD_REQUEST,
  FORBIDDEN_RESOURCE,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  READ_ALL_RECORDS,
  READ_RECORD,
  SUCCESSFUL_FETCH,
  SUCCESSFUL_UPDATE,
  UNAUTHORIZED_ACCESS,
  UPDATE_RECORD,
} from 'src/common/constants/constants';
import { UserNotificationsService } from './user-notifications.service';
import { UserNotification } from './entities/user-notification.entity';
import { IApiResponse } from 'src/common/interfaces';

@ApiTags('User Notifications')
@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: `${UNAUTHORIZED_ACCESS} Please login`,
})
@ApiResponse({ status: 403, description: FORBIDDEN_RESOURCE })
@Controller('user-notifications')
export class UserNotificationsController {
  constructor(
    private readonly userNotificationsService: UserNotificationsService,
  ) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({
    summary: `${READ_ALL_RECORDS} ${ACCESS_TO_ALL}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: [UserNotification],
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async findAllByUser(@Req() req): Promise<IApiResponse<any>> {
    const user = req.user;
    const allUserNotifications =
      await this.userNotificationsService.findAllByUser(user);
    return {
      message: SUCCESSFUL_FETCH,
      data: allUserNotifications,
      records: allUserNotifications.length,
    };
  }

  @Get('unread')
  @HttpCode(200)
  @ApiOperation({
    summary: `${READ_ALL_RECORDS} ${ACCESS_TO_ALL}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: [UserNotification],
  })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  async findAllUnreadByUser(@Req() req): Promise<IApiResponse<any>> {
    const user = req.user;
    const allUserNotifications =
      await this.userNotificationsService.findAllUnreadByUser(user);
    return {
      message: SUCCESSFUL_FETCH,
      data: allUserNotifications,
      records: allUserNotifications.length,
    };
  }

  @ApiOperation({
    summary: `${READ_RECORD} ${ACCESS_TO_ALL}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_FETCH,
    type: UserNotification,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @HttpCode(200)
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IApiResponse<any>> {
    const userNotification = await this.userNotificationsService.findOne(id);
    return { message: SUCCESSFUL_FETCH, data: userNotification };
  }

  @ApiOperation({
    summary: `${UPDATE_RECORD} ${ACCESS_TO_ALL}`,
  })
  @ApiResponse({
    status: 200,
    description: SUCCESSFUL_UPDATE,
    type: UserNotification,
  })
  @ApiResponse({ status: 404, description: NOT_FOUND })
  @ApiResponse({ status: 500, description: INTERNAL_SERVER_ERROR })
  @HttpCode(200)
  @Patch(':id/markAsRead')
  async markAsRead(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req,
  ): Promise<IApiResponse<any>> {
    const user = req.user;
    const updatedUserNotification =
      await this.userNotificationsService.markAsRead(id, user);
    return { message: SUCCESSFUL_UPDATE, data: updatedUserNotification };
  }
}
