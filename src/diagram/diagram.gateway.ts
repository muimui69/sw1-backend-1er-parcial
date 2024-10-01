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
    client.on('shape-move', (data) => {
      client.broadcast.emit('shape-move', data);
    });

    client.on('shape-add', (data) => {
      client.broadcast.emit('shape-add', data);
    });


    client.on('shape-remove', (data) => {
      client.broadcast.emit('shape-remove', data);
    });

  }

  handleDisconnect(client: Socket) {
    console.log("Client disconnected: " + client.id);
  }


}
