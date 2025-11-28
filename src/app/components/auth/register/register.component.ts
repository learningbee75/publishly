import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  error = signal('');
  success = signal('');

  async register() {
    if (!this.email().trim() || !this.password().trim()) {
      this.error.set('Please fill all fields.');
      this.success.set('');
      return;
    }
    this.error.set('');
    const result = await this.authService.register(this.email(), this.password());
    if (result) {
      this.success.set('Registration successful! Please log in.');
      this.router.navigate(['/login']);
    } else {
      this.error.set('Registration failed. Email may already be taken.');
      this.success.set('');
    }
  }

  async googleLogin() {
    try {
      await this.authService.googleLogin();
      this.router.navigate(['/']);
    } catch (e) {
      this.error.set('Google sign-up failed.');
    }
  }

  async facebookLogin() {
    try {
      await this.authService.facebookLogin();
      this.router.navigate(['/']);
    } catch (e) {
      this.error.set('Facebook sign-up failed.');
    }
  }
}
