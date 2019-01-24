import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule, MatInputModule, MatListModule,
  MatTabsModule
} from '@angular/material';

import {HttpClientModule} from '@angular/common/http';
import 'hammerjs';

import {UserService} from './services/user/user.service';
import {LoginService} from './services/login/login.service';
import {BookService} from './services/book/book.service';

import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav/top-bar/nav-bar.component';
import { AccountComponent } from './components/account/account.component';
import { FooterComponent } from './components/nav/footer/footer.component';
import { ChatComponent } from './components/live/chat/chat.component';
import { ChatDialogComponent } from './components/live/chat-dialog/chat-dialog.component';
import { TopBannerComponent } from './components/nav/top-banner/top-banner.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    AccountComponent,
    FooterComponent,
    ChatComponent,
    ChatDialogComponent,
    TopBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [
    LoginService,
    UserService,
    BookService
  ],
  entryComponents: [ChatDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
