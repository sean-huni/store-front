import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppConst} from '../../constants/app-const';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private serverPath = AppConst.serverPath;

  constructor(private httpClient: HttpClient) {
  }

  searchBookLikeTitle(title: string) {
    const url = this.serverPath + '/v1/books?all-by-title=' + title;
    return this.httpClient.get(url); // {headers: httpHeaders});
  }
}
