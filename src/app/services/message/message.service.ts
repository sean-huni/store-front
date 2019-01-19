import {Injectable} from '@angular/core';

import * as socketIo from 'socket.io-client';
import {AppConst} from '../../constants/app-const';
import {Observable} from 'rxjs';
import {Event} from '../../model/chat/event';
import {MessageInt} from '../../model/chat/message-int';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private socket;

  constructor() {
  }

  public initSocket(): void {
    // Demo Socket Here...
    this.socket = socketIo(AppConst.serverPath);
  }

  public send(message: MessageInt): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<MessageInt> {
    return new Observable<MessageInt>(observer => {
      this.socket.on('message', (data: MessageInt) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
