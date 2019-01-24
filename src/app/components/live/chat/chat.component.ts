import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Action} from '../../../enums/action';
import {Event} from '../../../enums/event';
import {Message} from '../../../model/int/Message';
import {MatDialog, MatDialogRef, MatList, MatListItem} from '@angular/material';
import {DialogUserType} from '../../../enums/dialog-user-type';
import {ChatDialogComponent} from '../chat-dialog/chat-dialog.component';
import {SocketService} from '../../../services/socket/socket.service';
import {UserInt} from '../../../model/int/user-int';


const AVATAR_URL = 'https://api.adorable.io/avatars/285';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  action = Action;
  user: UserInt;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  dialogRef: MatDialogRef<ChatDialogComponent> | null;
  defaultDialogUserParams: any = {
    disableClose: true,
    data: {
      title: 'Welcome',
      dialogType: DialogUserType.NEW
    }
  };


  // getting a reference to the overall list, which is the parent container of the list items
  @ViewChild(MatList, {read: ElementRef}) matList: ElementRef;

  // getting a reference to the items/messages within the list
  @ViewChildren(MatListItem, {read: ElementRef}) matListItems: QueryList<MatListItem>;

  constructor(private socketService: SocketService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initModel();
    // Using timeout due to https://github.com/angular/angular/issues/14748
    setTimeout(() => {
      this.openUserPopup(this.defaultDialogUserParams);
    }, 0);
  }

  ngAfterViewInit(): void {
    // subscribing to any changes in the list of items / messages
    this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }

  // auto-scroll fix: inspired by this stack overflow post
  // https://stackoverflow.com/questions/35232731/angular2-scroll-to-bottom-chat-style
  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  private initModel(): void {
    const randomId = this.getRandomId();
    this.user = {
      id: randomId,
      avatar: `${AVATAR_URL}/${randomId}.png`
    };
  }

  private initIoConnection(): void {
    setTimeout(() => {
      this.socketService.initSocket(this);
      console.log('isConnected-1: ', this.socketService.isConnected);
    }, 1);
  }

  waitedConnection(): void {
    console.log('isConnected-2: ', this.socketService.isConnected);
    if (this.socketService.isConnected) {
      console.log('Executed...');
      this.ioConnection = this.socketService.onMessage()
        .subscribe((message: Message) => {
          console.log('Pushed Message: ', message);
          message = JSON.parse((message).toString().split(/\r?\n/).pop());
          console.log('Extracted Message: ', message);
          // console.log('Parsed Message: ', JSON.parse(message).from);
          this.messages.push(Object.assign({}, message));
          console.log('All Messages: ', this.messages);
        });

      this.socketService.onEvent(Event.CONNECT)
        .subscribe(() => {
          console.log('connected');
        });

      this.socketService.onEvent(Event.DISCONNECT)
        .subscribe(() => {
          console.log('disconnected');
        });
    }
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }

  public onClickUserInfo() {
    this.openUserPopup({
      data: {
        username: this.user.name,
        title: 'Edit Details',
        dialogType: DialogUserType.EDIT
      }
    });
  }

  private openUserPopup(params): void {
    this.dialogRef = this.dialog.open(ChatDialogComponent, params);
    this.dialogRef.afterClosed().subscribe(paramsDialog => {
      if (!paramsDialog) {
        return;
      }

      this.user.name = paramsDialog.username;
      if (paramsDialog.dialogType === DialogUserType.NEW) {
        this.initIoConnection();
        setTimeout(() => {
          this.sendNotification(paramsDialog, Action.JOINED);
        }, 1000);
      } else if (paramsDialog.dialogType === DialogUserType.EDIT) {
        setTimeout(() => {
          this.sendNotification(paramsDialog, Action.RENAME);
        }, 1000);
      }
    });
  }

  public sendMessage(message: string): void {
    console.log('User: ', this.user);
    console.log('Message: ', message);

    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: message
    });
    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      };
    } else if (action === Action.RENAME) {
      message = {
        from: this.user,
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.send(message);
  }

  private instanceofString(obj: any): boolean {
    console.log('Content: ', obj);
    if (obj === undefined || obj === null) {
      return false;
    }

    const val = Object.getPrototypeOf(obj) === String.prototype;
    console.log('instanceOfString: ', val);
    return val;
  }

  private enumEquals(e1: Action, e2: Action): boolean {
    console.log('Content: ', e1);

    if (e1 !== undefined && e1 !== null && Object.getPrototypeOf(e1) === String.prototype) {
      switch (e1.toString()) {
        case 'JOINED':
          e1 = 0;
          break;
        case 'LEFT':
          e1 = 1;
          break;
        case 'RENAME':
          e1 = 2;
          break;
        default:
          return undefined;
      }
    }

    const val = e1 === e2;
    console.log(e1 + ' Equals ' + e2 + ': ', val);
    return val;
  }
}
