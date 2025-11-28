import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  error = signal('');

  async login() {
    if (!this.email().trim() || !this.password().trim()) {
      this.error.set('Please enter both email and password.');
      return;
    }
    this.error.set('');
    const success = await this.authService.login(this.email(), this.password());
    if (success) {
      this.router.navigate(['/']);
    } else {
      this.error.set('Invalid credentials.');
    }
  }

  async googleLogin() {
    try {
      await this.authService.googleLogin();
      this.router.navigate(['/']);
    } catch (e) {
      this.error.set('Google sign-in failed.');
    }
  }

  async facebookLogin() {
    try {
      await this.authService.facebookLogin();
      this.router.navigate(['/']);
    } catch (e) {
      this.error.set('Facebook sign-in failed.');
    }
  }
}
