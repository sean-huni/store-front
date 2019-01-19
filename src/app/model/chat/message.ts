import {UserChat} from '../user-chat';


export class Message {
  private _user: UserChat;
  private _content: string;

  constructor(fromUser: UserChat, userContent: string) {
    this._user = fromUser;
    this._content = userContent;
  }

  get user(): UserChat {
    return this._user;
  }

  set user(value: UserChat) {
    this._user = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }
}
