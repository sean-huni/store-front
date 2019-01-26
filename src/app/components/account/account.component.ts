import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login/login.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {

  private loginError = false;
  private loggedIn = false;
  private credentials = {'username': '', 'password': ''};

  private emailSent: boolean;
  private forgotPasswordEmailSent: boolean;
  private usernameExists: boolean;
  private emailExist: boolean;
  private username: string;
  private email: string;
  private recoveryEmail: string;
  private newUsername: string;
  private newPassword: string;

  constructor(private loginService: LoginService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    // ToDo: Restore the code.
    // this.loginService.checkSession().subscribe(
    //   resp => {
    //     console.log(resp);
    //     this.loggedIn = true;
    //   }, error => {
    //     console.log(error);
    //     this.loggedIn = false;
    //   });
  }

  exeLogin() {
    this.loginService.sendCredentials(this.credentials.username, this.credentials.password).subscribe(
      resp => {
        console.log(resp);
        localStorage.setItem('xAuthToken', resp['token']);
        location.reload();
        this.router.navigate(['/home']);
      }, error => {
        console.log(error);
        this.loggedIn = false;
        this.loginError = true;
      });
  }

  exeNewAccount() {
    this.usernameExists = false;
    this.emailExist = false;
    this.emailSent = false;

    this.userService.newUser(this.username, this.email).subscribe(
      resp => {
        console.log(resp);
        this.emailSent = true;
      },
      error => {
        console.log(error);
        const errorMessage = error.text();
        if (errorMessage === 'usernameExists') {
          this.usernameExists = true;
        }
        if (errorMessage === 'emailExists') {
          this.emailExist = true;
        }
      });
  }

  forgotPassword() {
    this.forgotPasswordEmailSent = false;
    this.emailExist = false;

    this.userService.passwordReset(this.recoveryEmail).subscribe(
      resp => {
        console.log(resp);
        this.forgotPasswordEmailSent = true;
      }, errorResp => {
        console.log(errorResp);
        const errorMsg = errorResp.test();
        const errorMessage = errorResp.test();
        if (errorMessage === 'usernameExists') {
          this.usernameExists = true;
        }
        if (errorMessage === 'emailExists') {
          this.emailExist = true;
        }
      });
  }
}
