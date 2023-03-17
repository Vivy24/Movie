import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    if (
      !localStorage.getItem('sessionID') ||
      !localStorage.getItem('accountID')
    ) {
      // role not authorised so redirect to home page
      this.router.navigate(['/authentication']);
      return false;
    }

    // authorised so return true
    return true;
  }
}
