import {Action} from './action';
import {UserChat} from '../user-chat';

export interface UserInt {
  from?: UserChat;
  content?: any;
  action?: Action;

}
