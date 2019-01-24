import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../../services/login/login.service';
import {BookService} from '../../../services/book/book.service';
import {Book} from '../../../model/book';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  private _loggedIn = false;
  private _titleKeyword: string;
  private bookList: Book[] = [];

  constructor(private loginService: LoginService, private bookService: BookService) {
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      resp => {
        console.log(resp);
        this._loggedIn = true;
      }, error => {
        console.log(error);
        this._loggedIn = false;
      }
    );
  }

  execLogout() {
    this.loginService.logout().subscribe(
      resp => {
        location.reload();
      }, error => {
        console.log(error);
      }
    );
  }

  searchBookByTitle() {
    this.bookService.searchBookLikeTitle(this._titleKeyword).subscribe(
      resp => {
        console.log(resp);
        this.bookList = resp['body'];
        console.log(this.bookList);
      }, error => {
        console.log(error);
      });
  }


  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }

  get titleKeyword(): string {
    return this._titleKeyword;
  }

  set titleKeyword(value: string) {
    this._titleKeyword = value;
  }
}
