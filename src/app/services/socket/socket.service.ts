import {Injectable} from '@angular/core';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {AppConst} from '../../constants/app-const';
import {Observable} from 'rxjs';
import {Message} from '../../model/int/Message';
import {Event} from '../../enums/event';
import {error} from '@angular/compiler/src/util';
import {resolve} from 'q';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  private stompClient;
  private _isConnected: boolean;

  private SERVER_URL = AppConst.serverPath;
  private STOMP_ENDPOINT = AppConst.stompEndpoint;

  constructor() {
  }

  public initSocket(): void {
    this.socket = SockJS(this.SERVER_URL + this.STOMP_ENDPOINT);
    this.stompClient = Stomp.over(this.socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
        _this.isConnected = true;
        console.log('Connection Frame-Data: ' + frame);

        // Subscribe...
      }
    );

  }

  public send(message: Message): void {
    console.log('Sent Data: ', message);
    this.stompClient.send('/room/public', {}, JSON.stringify(message));
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      console.log('onMessage Triggered...');
      this.stompClient.subscribe('/topic/msg', (data: Message) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      console.log('onEvent Triggered: ', event);
      this.stompClient.subscribe(event, () => observer.next());
    });
  }


  get isConnected(): boolean {
    return this._isConnected;
  }

  set isConnected(value: boolean) {
    this._isConnected = value;
  }
}
