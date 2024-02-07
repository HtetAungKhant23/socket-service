import { Inject } from '@nestjs/common';
import { ConnectedSocket, SubscribeMessage } from '@nestjs/websockets';
import { RedisClientType, SchemaFieldTypes } from 'redis';
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

  @SubscribeMessage('createIndex')
  async createIdx(@ConnectedSocket() client: Socket) {
    // cart
    try {
      const res = await this.redis.ft.create(
        'idx:cart',
        {
          '$.userId': {
            AS: 'userId',
            type: SchemaFieldTypes.TEXT,
            SORTABLE: true,
          },
          ['$.cartItems']: {
            AS: 'cartItems',
            type: SchemaFieldTypes.TEXT,
            SORTABLE: true,
          },
          '$.cartItems.productIds': {
            AS: 'cartItems.productIds',
            type: SchemaFieldTypes.TEXT,
            SORTABLE: true,
          },
          '$.cartItems.unitPrices': {
            AS: 'cartItems.unitPrices',
            type: SchemaFieldTypes.NUMERIC,
            SORTABLE: true,
          },
          '$.cartItems.quantities': {
            AS: 'cartItems.quantities',
            type: SchemaFieldTypes.NUMERIC,
            SORTABLE: true,
          },
        },
        {
          ON: 'JSON',
          PREFIX: 'cart',
        },
      );
      this.server.to(`${client.id}`).emit('gg', res);
    } catch (err) {
      if (err.message === 'Index already exists') {
        console.log('Index exists already, skipped creation.');
      } else {
        // Something went wrong, perhaps RediSearch isn't installed...
        console.error(err);
        process.exit(1);
      }
    }
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
