import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  
  public message: string;
  registerData: any;

  HorizontalPosition: MatSnackBarHorizontalPosition = 'end';
  VerticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds: number = 2;

  constructor(
    private _UserService: UserService,
    private _Router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.message = '';
    this.registerData = {};
  }

  ngOnInit(): void { }

  registerUser() {
    if (
      !this.registerData.name ||
      !this.registerData.email ||
      !this.registerData.password
    ) {
      console.log('Failed process: Imcomplete data');
      this.message = 'Failed process: Imcomplete data';
      this.openSnackBarError();
      this.registerData = {};
    } else {
      this._UserService.registerUser(this.registerData).subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem('token', res.jwtToken);
          this._Router.navigate(['/saveTask']);
          this.message = 'Succesfull user registration';
          this.openSnackBarSuccesfull();
          this.registerData = {};
        },
        (err) => {
          console.log(err);
          this.message = err.error;
          this.openSnackBarError();
        }
      );
    }
  }

  openSnackBarSuccesfull() {
    this._snackBar.open( this.message, 'X', {
      horizontalPosition: this.HorizontalPosition,
      verticalPosition: this.VerticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarTrue']
    })
  }

  openSnackBarError() {
    this._snackBar.open( this.message, 'X', {
      horizontalPosition: this.HorizontalPosition,
      verticalPosition: this.VerticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: ['style-snackBarFalse']
    })
  }
}
