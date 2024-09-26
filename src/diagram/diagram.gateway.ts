import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { DiagramService } from './diagram.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },

})
export class DiagramGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly diagramService: DiagramService) { }

  handleConnection(client: Socket) {
    console.log("Client connected: " + client.id);
  }

  handleDisconnect(client: Socket) {
    console.log("Client disconnected: " + client.id);
  }
}
