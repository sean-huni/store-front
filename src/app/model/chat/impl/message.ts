import {UserChat} from './user-chat';

export class Message {
  constructor(private fromUser: UserChat, private userContent: string) {}
}
