import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate: CanActivateFn = () => {
    const user = this.auth.currentUser();
    if (user && user.email === 'admin@example.com') return true;
    this.router.navigate(['/']);
    return false;
  }
}
