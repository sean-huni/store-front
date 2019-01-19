import {Injectable} from '@angular/core';

import * as socketIo from 'socket.io-client';
import {AppConst} from '../../constants/app-const';
import {Message} from '../../model/chat';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private socket;

  constructor() {
    this.socket = socketIo(AppConst.serverPath);
  }

  public initSocket(): void {
    // Demo Socket Here...
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
