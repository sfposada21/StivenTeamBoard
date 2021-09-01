import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _UserService: UserService, private _Router: Router) {}

  canActivate(): boolean {
    if (!this._UserService.loginId()) {
      this._Router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
