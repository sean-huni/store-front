import { Injectable } from '@angular/core';

import * as socketIo from 'socket.io-client';
import {AppConst} from '../../constants/app-const';
import {Observable} from 'rxjs';
import {Message} from '../../model/int/Message';
import {Event} from '../../enums/event';
import {error} from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;


  private SERVER_URL = AppConst.serverPath;

  constructor() {}

  public initSocket(): void {
    this.socket = socketIo(this.SERVER_URL);
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
