import {UserInt} from './user-int';
import {Action} from '../../enums/action';

export interface Message {
  from?: UserInt;
  content?: any;
  action?: Action;
}
