import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Inject, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { RedisClientType } from 'redis';

interface IWebSocketGatewayOption {
  transports?: string[];
  cors?: {
    origin?: string;
    method?: string[];
  };
  namespace?: string;
}

export const createWebSocketClass = (option: IWebSocketGatewayOption): any => {
  @WebSocketGateway(option)
  class PreConfigGateway implements OnGatewayInit, OnGatewayConnection {
    // constructor(
    //   @Inject('REDIS_CLIENT') private readonly redis: RedisClientType,
    // ) {}

    private logger: Logger = new Logger('Chat Gateway');
    // ? provided from onGatewayInit and will be called after the WebSocket gateway is initialized
    afterInit() {
      this.logger.log('Gooding initializing');
    }
    // ? provided from onGatewayConnection and will be called when a client connects to the WebSocket server
    handleConnection(client: Socket) {
      this.logger.log(`listen connected ${client.id}`);
      console.log(`listen connected ${client.id}`);
    }
    // ? provided from onGatewayConnection and will be called when a client disconnects from the WebSocket server
    handleDisconnect(client: Socket) {
      this.logger.log(`listen disconnected ${client.id}`);
      console.log(`listen disconnected ${client.id}`);
    }
    // ? allows the class to interact with the underlying Socket.IO server.
    @WebSocketServer()
    server: Server;
  }
  return PreConfigGateway;
};
