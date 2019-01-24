import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConst} from '../../constants/app-const';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private serverPath = AppConst.serverPath;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  sendCredentials(username: string, password: string) {
    const url = this.serverPath + '/token';
    const encodedCreds = btoa(username + ':' + password);
    const basicHeader = 'Basic ' + encodedCreds;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': basicHeader
    });
    return this.httpClient.post(url, null, {headers: headers});
  }

  checkSession() {
    const url = this.serverPath + '/checkSession';
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.get(url, {headers: headers});
  }

  logout() {
    const url = this.serverPath + '/logout';
    const headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('xAuthToken')
    });
    return this.httpClient.post(url, null, {headers: headers});
  }
}
