import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatDividerModule, MatTabsModule} from '@angular/material';

import {HttpClientModule} from '@angular/common/http';
import 'hammerjs';

import {UserService} from './services/user/user.service';
import {LoginService} from './services/login/login.service';
import {BookService} from './services/book/book.service';

import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav/top-bar/nav-bar.component';
import { AccountComponent } from './components/account/account.component';
import { FooterComponent } from './components/nav/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    AccountComponent,
    FooterComponent
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
    MatDividerModule
  ],
  providers: [
    LoginService,
    UserService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
