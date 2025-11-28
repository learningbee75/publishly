import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate: CanActivateFn = () => {
    // Prefer Firebase user state first:
    // if (this.auth.isLoggedInFirebase()) return true;

    // Fallback to localStorage signal:
    if (this.auth.isLoggedInLocal()) return true;

    this.router.navigate(['/login']);
    return false;
  }
}
