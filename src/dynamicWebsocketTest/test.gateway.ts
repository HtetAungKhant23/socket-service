import { ConnectedSocket, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { createWebSocketClass } from 'src/config/socket.gateway';

const PreConfigGateway = createWebSocketClass({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
  namespace: 'test',
});

export class testGateway extends PreConfigGateway {
  @SubscribeMessage('test')
  test(@ConnectedSocket() client: Socket) {
    this.server.to(client.id).emit('gg', { ok: 'nasa' });
    return 'fuck yes';
  }
}
