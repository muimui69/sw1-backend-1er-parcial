import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class DiagramGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('Cliente conectado: ' + client.id);

    client.on('joinRoom', (room: string) => {
      client.join(room);
      client.data.room = room;
      console.log(`Cliente ${client.id} se unió a la sala ${room}`);
    });


    client.on('leaveRoom', () => {
      const room = client.data.room;
      if (room) {
        client.leave(room);
        console.log(`Cliente ${client.id} salió de la sala ${room}`);
        delete client.data.room;
      }
    });

    client.on('shape-add', (data) => {
      console.log('Servidor recibió shape-add:', data);
      const room = client.data.room;
      if (room) {
        client.to(room).emit('shape-add', data);
      }
    });

    client.on('shape-move', (data) => {
      console.log('Servidor recibió shape-move:', data);
      const room = client.data.room;
      if (room) {
        client.to(room).emit('shape-move', data);
      }
    });

    client.on('shape-remove', (data) => {
      console.log('Servidor recibió shape-remove:', data);
      const room = client.data.room;
      if (room) {
        client.to(room).emit('shape-remove', data);
      }
    });

    client.on('shape-update', (data) => {
      console.log('Servidor recibió shape-update:', data);
      const room = client.data.room;
      if (room) {
        client.to(room).emit('shape-update', data);
      }
    });

    client.on('link-add', (linkData) => {
      console.log('Servidor recibió link-add aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa:', linkData); // Verifica que el servidor recibe el enlace

      const room = client.data.room;
      if (room) {
        client.to(room).emit('link-add', linkData);
        console.log(`Enlace reenviado a la sala: ${room}`);
      } else {
        console.log('Cliente no está en ninguna sala.');
      }
    });

    client.on('link-move', (linkData) => {
      console.log('Servidor recibió link-update:', linkData);
      const room = client.data.room;
      if (room) {
        client.to(room).emit('link-move', linkData);
      }
    });

    client.on('link-remove', (data) => {
      console.log('Servidor recibió link-remove:', data);
      const room = client.data.room;
      if (room) {
        client.to(room).emit('link-remove', data);
      }
    });

    client.on('link-update', (data) => {
      console.log('Servidor recibió link-update:', data);
      const room = client.data.room;
      if (room) {
        client.to(room).emit('link-update', data);
      }
    });
  }

  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado: ' + client.id);
    const room = client.data.room;
    if (room) {
      client.leave(room);
      console.log(`Cliente ${client.id} salió de la sala ${room} al desconectarse`);
      delete client.data.room;
    }
  }
}
