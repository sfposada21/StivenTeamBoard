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

  constructor(
    private_UserService: UserService,
    private_Router: Router,
    private_MatSnackBar: MatSnackBar
  ) {
    this.message = '';
    this.registerData ={};
  }

  ngOnInit(): void {}

  registerUser() {}

  openSnackBarSuccesfull() {}

  openSnackBarError() {}
}
