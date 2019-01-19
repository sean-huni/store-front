import {Message} from '.';
import {UserChat} from './impl/user-chat';

export class ChatMessage extends Message {
  constructor(from: UserChat, content: string) {
    super(from, content);
  }
}
