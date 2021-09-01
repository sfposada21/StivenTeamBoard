import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public message: string;
  loginData: any;

  HorizontalPosition: MatSnackBarHorizontalPosition = 'end';
  VerticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _UserService: UserService,
    private _Router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.message = '';
    this.loginData = {};
  }

  ngOnInit(): void {}

  login(){
    if (      
      !this.loginData.email ||
      !this.loginData.password
    ) {
      console.log('Failed process: Imcomplete data');
      this.message = 'Failed process: Imcomplete data';
      this.openSnackBarError();
      this.loginData = {};
    } else {
      this._UserService.login(this.loginData).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.jwtToken);
          this._Router.navigate(['/listTask']);
          this.loginData = {};
        },
        (err) => {
          console.log(err);
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }


  }

  openSnackBarError() {
    this._snackBar.open(this.message, 'X', {
      horizontalPosition: this.HorizontalPosition,
      verticalPosition: this.VerticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse'],
    });
  }
}
