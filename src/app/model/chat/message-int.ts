import {Action} from './action';
import {UserInt} from './user-int';

export interface MessageInt {
  from?: UserInt;
  content?: any;
  action?: Action;

}
