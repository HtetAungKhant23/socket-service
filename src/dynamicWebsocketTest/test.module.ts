import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { testGateway } from './test.gateway';
import { RedisModule } from 'src/redis.module';

@Module({
  imports: [RedisModule],
  providers: [testGateway, TestService],
})
export class TestModule {}
