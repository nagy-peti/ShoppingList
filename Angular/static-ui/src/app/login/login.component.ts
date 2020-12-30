import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginGuard } from '../login-guard/login.guard';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

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
  
  private fixPassword = 'temp';
  private fixUsername = 'temp';

  constructor(
    private router:Router,
    private login: LoginGuard,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }

  getVerification(){
    if(this.username === this.fixUsername && this.password === this.fixPassword){
          this.login.changeLogInState(true);
          this.router.navigate(['/main']);
          this.isInvalid = false;
        }else{
          this.isInvalid = true;
          this.username = "";
          this.password = "";
        };
  };

  openDialog(){
    const dialogRef = this.dialog.open(RegisterDialogComponent,{
      width: '250px'
    });
  }
}
