import {Injectable} from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import {AppConst} from '../../constants/app-const';
import {Observable, Subscription} from 'rxjs';
import {Message as MsgCustom} from '../../model/int/Message';
import {Message} from '@stomp/stompjs';
import {Event} from '../../enums/event';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  private stompClient;
  private _isConnected: boolean;

  private SERVER_URL = AppConst.serverPath;
  private STOMP_ENDPOINT = AppConst.stompEndpoint;
  private messages: MsgCustom[];

  constructor(private rxStompService: RxStompService) {
  }

  public initSocket(): void {
    // this.socket = SockJS(this.SERVER_URL + this.STOMP_ENDPOINT);
    // this.stompClient = Stomp.over(this.socket);
    // const _this = this;
    // this.stompClient.connect({}, function (frame: any) {
    //   _this.isConnected = true;
    //   console.log('Connection Frame-Data: ' + frame);
    // });

  }

  public send(message: MsgCustom): void {
    console.log('Sent Data: ', message);
    // this.stompClient.send('/room/public', {}, JSON.stringify(message));

    this.rxStompService.publish({destination: '/room/public', body: JSON.stringify(message)});
  }


  public onMessage(messages: MsgCustom[]): Observable<MsgCustom> {
    return new Observable<MsgCustom>(observer => {
      console.log('onMessage Triggered...');
      this.rxStompService.watch('/topic/msg').subscribe((data: Message) => {
          observer.next(JSON.parse(data.body));
          messages.push(JSON.parse(data.body));
        }, error1 => console.error(error1),
        () => console.log('done...'));
    });

    // return this.rxStompService.watch('/topic/msg').subscribe((message: Message) => {
    //   messages.push(JSON.parse(message.body));
    //   this.messages = messages;
    // });
  }

  public onEvent(event: Event): Observable<Event> {
    return new Observable<Event>(observer => {
      // console.log('onEvent Triggered: ', event);
      this.rxStompService.watch(event).subscribe(() => observer.next(event));
      console.log('onEvent Triggered: ', event);
    });

    // return this.rxStompService.watch(event).subscribe((message: Message) => {
    //   console.log('onEvent Resp: ', JSON.parse(message.body));
    // });
  }

  get isConnected(): boolean {
    return this._isConnected;
  }

  set isConnected(value: boolean) {
    this._isConnected = value;
  }
}
