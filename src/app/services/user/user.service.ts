import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConst} from '../../constants/app-const';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private serverPath: string = AppConst.serverPath;

  constructor(private httClient: HttpClient) {
  }

  newUser(username: string, email: string) {
    const url = this.serverPath + '/login/verify';
    const userInfo = {
      'username': username,
      'email': email
    };

    const tokenizeHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httClient.post(url, JSON.stringify(userInfo), {headers: tokenizeHeader});
  }

  passwordReset(email: string) {
    const url = this.serverPath + '/forgotPassword';
    const userInfo = {
      'email': email
    };

    const tokenizeHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httClient.post(url, JSON.stringify(userInfo), {headers: tokenizeHeader});
  }
}
