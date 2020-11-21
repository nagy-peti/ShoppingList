import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginGuard } from './login-guard/login.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Shopping List';
  isLoggedIn: boolean = false;

  private subscription: Subscription;

  constructor(
    private login: LoginGuard,
    private router: Router
  ){
    this.subscription = login.observingLoggingInSubject.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      }
    )
  }

  logout():void{
    this.login.changeLogInState(false);
    this.router.navigate(['']);
  }

}
