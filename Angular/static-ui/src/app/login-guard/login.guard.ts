import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router
    ){}

  private logIn: boolean = false;
  private loggedInSubject = new Subject<boolean>();
  observingLoggingInSubject = this.loggedInSubject.asObservable();

  changeLogInState(loggedIn:boolean){
    this.logIn = loggedIn;
    this.loggedInSubject.next(loggedIn);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(this.logIn){
        return true;
      }else{
        this.router.navigate(['']);
        return false;
      }
  }  
}
