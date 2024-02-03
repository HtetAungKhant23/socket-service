import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { testGateway } from './test.gateway';

@Module({
  providers: [testGateway, TestService],
})
export class TestModule {}
