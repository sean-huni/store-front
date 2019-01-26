import {Component, Input, OnInit} from '@angular/core';
import {LoginService} from '../../../services/login/login.service';
import {BookService} from '../../../services/book/book.service';
import {Book} from '../../../model/book';
import {KeyCodes} from '../../../enums/key-codes';
import {ComboBoxPipe} from './combo-box.pipe';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [ComboBoxPipe]
})
export class NavBarComponent implements OnInit {
  // @Input()
  private bookList: Book[] = [];
  private dispList: Book[] = [];

  private textToSort: Book[] = [];

  // @Input()
  private columnName: string;
  private columnName2: string;
  private _loggedIn = false;
  private _titleKeyword: string;

  private showDropDown: boolean;
  private counter: number;


  constructor(private loginService: LoginService, private bookService: BookService, private comboPipe: ComboBoxPipe) {
    this.titleKeyword = '';
  }

  ngOnInit() {
    // Todo: Restore the code.
    // this.loginService.checkSession().subscribe(
    //   resp => {
    //     console.log(resp);
    //     this._loggedIn = true;
    //   }, error => {
    //     console.log(error);
    //     this._loggedIn = false;
    //   }
    // );
    this.columnName = 'title';
    this.columnName2 = 'author';
    this.reset();
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
        console.log('http Resp: ', resp);
        this.bookList = JSON.parse(JSON.stringify(resp));
        console.log('BookList Resp Arr: ', this.bookList);
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

  /*
    =======================================================
    Combobox App Code
    =======================================================
  */
  reset(): void {
    this.showDropDown = false;
    this.searchBookByTitle();
  }

  onBlurEventAction(): void {
    // if(this.counter > -1)this.textToSort = this.bookList[this.counter][this.columnName];
    this.showDropDown = !this.showDropDown;

    if (this.showDropDown && (this.titleKeyword === undefined || this.titleKeyword === null || this.titleKeyword.trim() === '')) {
      if (this.bookList.length === 0) {
        this.searchBookByTitle();
      } else {
        this.dispList = this.bookList;
      }
    } else {
      this.dispList = this.comboPipe.transform(this.bookList, this.columnName, this.columnName2, this.titleKeyword);
    }
  }

  checkHighlight(currentItem): boolean {
    if (this.counter === currentItem) {
      return true;
    } else {
      return false;
    }
  }

  onFocusEventAction(): void {
    this.counter = -1;
  }

  onClick(): void {
    // this.onBlurEventAction();
  }

  textChange(value) {
    console.log('text-Change : ', value);
    if (value !== undefined && value !== null && value !== '' && value.length > 0) {

      this.dispList = this.comboPipe.transform(this.bookList, this.columnName, this.columnName2, value);
      console.log('dispList', this.dispList);
      console.log('columnName', this.columnName);

      if (this.dispList) {
        this.showDropDown = true;
      }
    } else if (value === undefined || value === null || value.toString().trim() === '') {
      if (this.bookList.length === 0) {
        this.searchBookByTitle();
      } else {
        this.dispList = this.bookList;
      }
    }
  }

  onKeyDownAction(event: KeyboardEvent): void {
    this.showDropDown = true;
    if (event.code === KeyCodes.UP_ARROW.toString()) {
      this.counter = (this.counter === 0) ? this.counter : --this.counter;
      this.checkHighlight(this.counter);
      this.textToSort = this.bookList[this.counter][this.columnName];
    }

    if (event.code === KeyCodes.DOWN_ARROW.toString()) {
      this.counter = (this.counter === this.bookList.length - 1) ? this.counter : ++this.counter;
      this.checkHighlight(this.counter);
      this.textToSort = this.bookList[this.counter][this.columnName];
    }
    // if(event.keyCode === KEY_CODE.TAB_KEY){
    //   this.textToSort = this.bookList[this.counter];
    //   this.showDropDown = false;
    // }
  }

  private updateTextBox(selectedRow: Book): void {
    console.log('Value Selected: ', selectedRow);
    this.titleKeyword = selectedRow.title;
    this.dispList = this.comboPipe.transform(this.bookList, this.columnName, this.columnName2, this.titleKeyword);
    this.showDropDown = false;
  }
}
