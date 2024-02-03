import { ConnectedSocket, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PreConfigGateway } from 'src/config/socket.gateway';

export class testGateway extends PreConfigGateway {
  @SubscribeMessage('test')
  test(@ConnectedSocket() client: Socket) {
    // console.log(this.server);
    // console.log(client.handshake);
    // this.server.emit('gg', { ok: 'nasa' });
    this.server.to(client.id).emit('gg', { ok: 'nasa' });
    return 'fuck yes';
  }
}
