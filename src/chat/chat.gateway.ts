import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  transports: ['websocket'], // ? transport protocols allows only 'websocket' in this case.
  cors: {
    origin: '*',
  },
  namespace: 'chat', // ? endpoint for that gateway
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection {
  private logger: Logger = new Logger('Chat Gateway');
  constructor(private readonly chatService: ChatService) {}

  // ? provided from onGatewayInit and will be called after the WebSocket gateway is initialized
  afterInit() {
    this.logger.log('Gooding initializing');
  }

  // ? provided from onGatewayConnection and will be called when a client connects to the WebSocket server
  handleConnection(client: Socket) {
    this.logger.log(`listen connected ${client.id}`);
  }

  // ? provided from onGatewayConnection and will be called when a client disconnects from the WebSocket server
  handleDisconnect(client: Socket) {
    this.logger.log(`listen disconnected ${client.id}`);
  }

  // ? allows the class to interact with the underlying Socket.IO server.
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createChat')
  create(
    @ConnectedSocket() client: Socket,
    @MessageBody() createChatDto: { gg: string },
  ) {
    this.server.emit('res', { la: 'khwan' });
    return this.chatService.create(createChatDto.gg);
  }

  @SubscribeMessage('findAllChat')
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage('findOneChat')
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage('updateChat')
  update(@MessageBody() updateChatDto: { gg: string }) {
    return this.chatService.update(updateChatDto.gg, updateChatDto.gg);
  }

  @SubscribeMessage('removeChat')
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
