import { Module } from '@nestjs/common';
import { createClient } from 'redis';

@Module({
  providers: [
    {
      provide: 'REDIS_CUSTOM_PROVIDER',
      useValue: {
        url: 'redis://default:LbE3XSIud2xa1ypOgrYWs8yOKfOPZvTw@redis-18903.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:18903',
      },
    },
    {
      inject: ['REDIS_CUSTOM_PROVIDER'],
      provide: 'REDIS_CLIENT',
      useFactory: async (option: { url: string; ttl: 2000 }) => {
        console.log(option.url);

        const client = createClient(option);
        await client.connect();
        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
