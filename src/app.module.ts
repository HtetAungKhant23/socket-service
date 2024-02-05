import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { TestModule } from './dynamicWebsocketTest/test.module';
import { RedisModule } from './redis.module';

@Module({
  imports: [ChatModule, TestModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
