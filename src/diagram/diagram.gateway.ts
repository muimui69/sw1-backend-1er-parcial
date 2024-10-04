import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Asegúrate de configurar CORS correctamente
  },
})
export class DiagramGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Cliente conectado: ' + client.id);
    client.on('shape-add', (data) => {
      console.log('Servidor recibió shape-add:', data);
      client.broadcast.emit('shape-add', data);
    });


    client.on('shape-move', (data) => {
      console.log('Servidor recibió shape-move:', data);
      client.broadcast.emit('shape-move', data);
    });

    client.on('shape-remove', (data) => {
      console.log('Servidor recibió shape-remove:', data);
      client.broadcast.emit('shape-remove', data);
    });

    client.on('shape-update', (data) => {
      console.log('Servidor recibió shape-update:', data);
      client.broadcast.emit('shape-update', data);
    });

  }

  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado: ' + client.id);
  }


}
