import {UserInt} from './chat/user-int';
import {Action} from './chat/action';

export class UserChat {
  private _id: number;
  private _avatar: string;
  private _content: any;
  private _action: Action;

  constructor(private _name: string) {}


  get content(): any {
    return this._content;
  }

  set content(value: any) {
    this._content = value;
  }

  get action(): Action {
    return this._action;
  }

  set action(value: Action) {
    this._action = value;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get avatar(): string {
    return this._avatar;
  }

  set avatar(value: string) {
    this._avatar = value;
  }
}
