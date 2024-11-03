import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserNotificationsService } from './user-notifications.service';
import { UsersService } from 'src/users/users.service';
import { ALLOWED_ORIGINS } from 'src/common/constants/constants';

@WebSocketGateway({
  cors: {
    origin: ALLOWED_ORIGINS, // Asegúrate de que allowedOrigins esté definido adecuadamente
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
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    // console.log(data);
    // este envia a todos incluido a si mismo
    // this.server.emit('server-message', data);

    // este envia a todos pero no a si mismo
    client.broadcast.emit('server-message', data);
  }

  async emitEvent(event: string, data: any) {
    console.log(event, data);
    const users = await this.usersService.findAllRegardlessStatus();
    await this.userNotificationsService.createNotification(data, users);
    this.server.emit(event, data);
  }
}
