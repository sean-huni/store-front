import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatInputModule, MatTabsModule} from '@angular/material';

import {HttpClientModule} from '@angular/common/http';
import 'hammerjs';

import {UserService} from './services/user/user.service';
import {LoginService} from './services/login/login.service';
import {BookService} from './services/book/book.service';

import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav/top-bar/nav-bar.component';
import { AccountComponent } from './components/account/account.component';
import { FooterComponent } from './components/nav/footer/footer.component';
import {MessageService} from './services/message/message.service';
import { DialogUserComponent } from './components/dialog-user/dialog-user.component';
import { ChatComponent } from './components/chat/chat.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    AccountComponent,
    FooterComponent,
    DialogUserComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [
    LoginService,
    UserService,
    BookService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
