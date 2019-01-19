import {Action} from './action';
import {User} from '../user';
import {UserChat} from '../user-chat';
import {UserInt} from './user-int';

export interface Message {
  from?: UserInt;
  content?: any;
  action?: Action;

}
