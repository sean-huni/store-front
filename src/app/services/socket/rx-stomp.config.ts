import {InjectableRxStompConfig} from '@stomp/ng2-stompjs';
import {Versions} from '@stomp/stompjs/esm5/versions';
import {AppConst} from '../../constants/app-const';


export const rxStompConfig: InjectableRxStompConfig = {
  // Which server?
  brokerURL: AppConst.serverWebsocket + AppConst.stompEndpoint,

  // Headers
  // Typical keys: login, passcode, host
  connectHeaders: {
    host: AppConst.serverPath,
    login: 'sean2kay',
    passcode: 'password1'
  },

  // How often to heartbeat?
  // Interval in milliseconds, set to 0 to disable
  heartbeatIncoming: 0, // Typical value 0 - disabled
  heartbeatOutgoing: 2000, // Typical value 20000 - every 20 seconds

  // Wait in milliseconds before attempting auto reconnect
  // Set to 0 to disable
  // Typical value 500 (500 milli seconds)
  reconnectDelay: 10000,

  // Will log diagnostics on console
  // It can be quite verbose, not recommended in production
  // Skip this key to stop logging to console
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  }

  // stompVersions: new Versions([Versions.V1_2])
};
