import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule,
  MatDividerModule, MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatTabsModule
} from '@angular/material';

import {MatDialogModule, MatDialog, MatDialogRef} from '@angular/material/dialog';

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
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatInputModule,
    MatDialog,
    MatDialogRef,
    MatIconModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule
  ],
  providers: [
    LoginService,
    UserService,
    BookService,
    MessageService
  ],
  entryComponents: [DialogUserComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
