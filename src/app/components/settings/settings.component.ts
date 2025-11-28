import { Component, inject, signal, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  private auth = inject(AuthService);

  name = signal('');
  bio = signal('');
  avatar = signal('');
  password = signal('');
  success = signal('');
  error = signal('');

  ngOnInit() {
    const user = this.auth.currentUser();
    if (user) {
      this.name.set(user.name);
      this.bio.set(user.bio || '');
      this.avatar.set(user.avatar || '');
    }
  }

  save() {
    if (!this.name().trim()) {
      this.error.set('Name cannot be empty.');
      this.success.set('');
      return;
    }
    this.auth.updateProfile({
      name: this.name(),
      bio: this.bio(),
      avatar: this.avatar()
    });
    this.error.set('');
    this.success.set('Profile updated!');
  }

  changePassword() {
    if (!this.password().trim()) {
      this.error.set('Enter new password.');
      this.success.set('');
      return;
    }
    this.auth.updatePassword(this.password());
    this.error.set('');
    this.success.set('Password changed!');
    this.password.set('');
  }
}
