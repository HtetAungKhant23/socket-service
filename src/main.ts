import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RedisIoAdapter } from './redis.adapter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });

  // ? This custom adapter uses Redis as a back-end for handling communication between different Socket.IO instances.
  const redisIoAdapter = new RedisIoAdapter(app);

  // ? creating two Redis clients (pubClient and subClient), and then creating a Socket.IO adapter using these clients
  await redisIoAdapter.connectToRedis();

  // ? Socket.IO communication in the application will now use the Redis-backed adapter
  app.useWebSocketAdapter(redisIoAdapter);

  await app
    .listen(3004)
    .then(() => Logger.log('Socket server successfully started'));
}
bootstrap();
