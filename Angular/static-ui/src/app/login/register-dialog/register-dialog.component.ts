import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginGuard } from 'src/app/login-guard/login.guard';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  public username: string = "";
  public password: string = "";
  public email: string = "";
  constructor(
    private router: Router,
    private login: LoginGuard,
    private dialogRef: MatDialogRef<RegisterDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  createAccount(){
    this.login.changeLogInState(true);
    this.router.navigate(['/main']);
    this.dialogRef.close();
  }
}
