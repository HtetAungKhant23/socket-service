import { Inject } from '@nestjs/common';
import { ConnectedSocket, SubscribeMessage } from '@nestjs/websockets';
import { RedisClientType } from 'redis';
import { Socket } from 'socket.io';
import { createWebSocketClass } from 'src/config/socket.gateway';

// ? just call my function with your custom option and then my function give you back websocket class that is ready to use
const PreConfigGateway = createWebSocketClass({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
  namespace: 'test',
});

export class testGateway extends PreConfigGateway {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: RedisClientType) {
    super();
  }

  @SubscribeMessage('test')
  async test(@ConnectedSocket() client: Socket) {
    this.server.to(client.id).emit('gg', { ok: 'nasa' });
    return 'fuck yes';
  }

  @SubscribeMessage('hak')
  async hak(@ConnectedSocket() client: Socket) {
    // const tt = await this.redis.json.set(`userId:${client.id}`, '$', {
    //   id: client.id,
    //   ok: 'na sa',
    // });
    // console.log(tt);

    const res = await this.redis.json.get(`userId:sVeAz1AIjuriEj-gAAAB`);
    console.log(res);
    this.server.to(client.id).emit('gg', { ok: res });
    return res;
  }
}
