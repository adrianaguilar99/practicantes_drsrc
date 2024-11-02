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

@WebSocketGateway()
export class UserNotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
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
    console.log(data);
    // este envia a todos incluido a si mismo
    // this.server.emit('server-message', data);

    // este envia a todos pero no a si mismo
    client.broadcast.emit('server-message', data);
  }

  emitEvent(event: string, data: any) {
    console.log(event, data);

    this.server.emit(event, data);
  }
}
