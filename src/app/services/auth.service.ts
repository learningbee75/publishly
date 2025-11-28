// src/app/services/auth.service.ts
import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, authState, signInWithEmailAndPassword, createUserWithEmailAndPassword,
         signInWithPopup, GoogleAuthProvider, FacebookAuthProvider,
         signOut, updatePassword as fbUpdatePassword, User } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import usersJson from '../data/users.json';


export interface AppUser {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  password?: string;
  isAdmin?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private auth = inject(Auth);
  private http = inject(HttpClient);

  private _currentUser = signal<AppUser | null>(null);
  currentUser = this._currentUser.asReadonly();
  isLoggedIn = computed(() => !!this._currentUser());
  
  users: AppUser[] = usersJson;

  constructor() {
    // listen to Firebase auth state
    authState(this.auth).subscribe((fbUser) => {
      if (fbUser) {
        const mapped = this.mapFirebaseUser(fbUser);
        this.setUser(mapped);
      } else {
        this.clearUser();
      }
    });

    // hydrate from localStorage on hard refresh
    this.restoreFromStorage();
  }

  // ------------ EMAIL / PASSWORD -----------------\

   async login(email: string, password: string): Promise<boolean> {
    const normalized = email.trim().toLowerCase();
    const user = this.users.find(u => u.email === normalized && u.password === password);
    if (!user) return false;

    const { password: _pw, ...safeUser } = user;
    this.setUser(safeUser);
    this._currentUser.set(safeUser);
    return true;
  }

  async register(email: string, password: string): Promise<boolean> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
      return true;
    } catch (e) {
      console.error('Register failed', e);
      return false;
    }
  }

  // ------------ GOOGLE LOGIN ---------------------

  async googleLogin(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
    // authState subscription will set currentUser
  }

  // ------------ FACEBOOK LOGIN -------------------

  async facebookLogin(): Promise<void> {
    const provider = new FacebookAuthProvider();
    await signInWithPopup(this.auth, provider);
  }

  // ------------ LOGOUT ---------------------------

  async logout(): Promise<void> {
    this.setUser(null);
    await signOut(this.auth);
    this.clearUser();
    await this.router.navigate(['/login']);
  }

  // ------------ PROFILE & PASSWORD ---------------

  updateProfile(update: Partial<AppUser>): void {
    const merged = { ...this._currentUser(), ...update } as AppUser;
    this.setUser(merged);
  }

  updatePassword(newPassword: string): Promise<void> {
    if (!this.auth.currentUser) {
      return Promise.reject('User not logged in');
    }
    return fbUpdatePassword(this.auth.currentUser, newPassword);
  }

  // ------------ INTERNAL HELPERS -----------------

  private mapFirebaseUser(user: User): AppUser {
    return {
      id: user.uid as any,
      email: user.email ?? '',
      name: user.displayName ?? user.email ?? '',
      avatar: user.photoURL ?? undefined
    };
  }

  private setUser(user: AppUser | null): void {
    this._currentUser.set(user);
    if (user) {
      localStorage.setItem('publishly_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('publishly_auth_user');
    }
  }

  private clearUser(): void {
    this._currentUser.set(null);
    localStorage.removeItem('publishly_auth_user');
  }

  private restoreFromStorage(): void {
    if (this._currentUser()) return; // authState will override anyway
    const raw = localStorage.getItem('publishly_auth_user');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.id && parsed.email) {
        this._currentUser.set(parsed);
      }
    } catch {
      localStorage.removeItem('publishly_auth_user');
    }
  }

  isLoggedInLocal(): boolean {
    // Optionally, use localStorage value (set this on login)
    return Boolean(localStorage.getItem('publishly_auth_user'));
  }
}
