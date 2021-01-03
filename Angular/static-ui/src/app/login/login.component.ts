import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginGuard } from '../login-guard/login.guard';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { UsersService } from '../services/users.service';
import * as _ from 'lodash';
import { SerialNumberService } from '../services/serialNumber.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public password: string = "";
  public username: string = "";
  public hasError: boolean = false;
  public isInvalid: boolean = false;

  constructor(
    private router:Router,
    private login: LoginGuard,
    public dialog: MatDialog,
    private backend: UsersService,
    private serialNumber: SerialNumberService
    ) { }

  ngOnInit(): void {
  }

  getVerification(){
    this.backend.getVerification(_.clone(this.username), _.clone(this.password)).subscribe(
      data => {
        if(!_.isNull(data)){
          this.serialNumber.broadcastId(<number>data);
          this.login.changeLogInState(true);
          this.router.navigate(['/main']);
          this.isInvalid = false;
        }else{
          this.isInvalid = true;
          this.username = "";
          this.password = "";
        };
      }
    );
  };

  openDialog(){
    const dialogRef = this.dialog.open(RegisterDialogComponent,{
      width: '250px'
    });
  }
}
