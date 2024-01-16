import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  create(createChatDto: string) {
    return `This action adds a new chat ${createChatDto}`;
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: string, updateChatDto: string) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
