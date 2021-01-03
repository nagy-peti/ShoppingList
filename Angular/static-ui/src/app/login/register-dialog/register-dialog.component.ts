import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginGuard } from 'src/app/login-guard/login.guard';
import { SerialNumberService } from 'src/app/services/serialNumber.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  public username: string = "";
  public password: string = "";

  public isInvalid: boolean = false;
  constructor(
    private router: Router,
    private login: LoginGuard,
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private backend: UsersService,
    private serialNumber: SerialNumberService
  ) { }

  ngOnInit(): void {
  }

  createAccount(){
    this.backend.addNewUser(this.username, this.password).subscribe(
      data => {
        if(<number>data === -1){
          this.isInvalid = true;
          this.username = "";
          this.password = "";
        }else{
          this.isInvalid = false;
          this.serialNumber.broadcastId(<number>data);
          this.login.changeLogInState(true);
          this.router.navigate(['/main']);
          this.dialogRef.close();
        }
      }
    )
  }
}
