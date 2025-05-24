import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserNotificationsService } from './user-notifications.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
})
export class UserNotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly userNotificationsService: UserNotificationsService,
    private readonly usersService: UsersService,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(
      `Client connected: ${client.id} - Total clients: ${this.server.engine.clientsCount}`,
    );
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  async emitEvent(event: string, data: any) {
    console.log(event, data);
    const users = await this.usersService.findAllRegardlessStatus();
    await this.userNotificationsService.createNotification(data, users);
    this.server.emit(event, data);
  }
}
