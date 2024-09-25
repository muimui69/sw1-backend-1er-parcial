import {
    // SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    // MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class DiagramGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    // @SubscribeMessage('diagramUpdate')
    // handleDiagramUpdate(@MessageBody() data: any): void {
    //     this.server.emit('diagramUpdate', data);
    // }

    handleConnection(client: Socket) {
        console.log("Client connected: " + client.id);
    }

    handleDisconnect(client: Socket) {
        console.log("Client disconnected: " + client.id);
    }
}
