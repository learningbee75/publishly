import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },  
  {
    path: 'home',
    component: HomeComponent,
  },
  { 
    path: 'article/:id',
    loadComponent: () => import('./components/article-detail/article-detail.component').then(c => c.ArticleDetailComponent) 
  },
  { 
    path: 'editor', 
    loadComponent: () => import('./components/editor/editor.component').then(c => c.EditorComponent),
    canActivate: [AuthGuard] 
  },
  { 
    path: 'login', 
    loadComponent: () => import('./components/auth/login/login.component').then(c => c.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/auth/register/register.component').then(c => c.RegisterComponent)
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./components/author-directory/profile/profile.component').then(c => c.ProfileComponent),
    canActivate: [AuthGuard] 
  },
  { 
    path: 'profile/:id', 
    loadComponent: () => import('./components/author-directory/profile/profile.component').then(c => c.ProfileComponent)
  },
  { 
    path: 'directory', 
    loadComponent: () => import('./components/author-directory/author-directory.component').then(c => c.AuthorDirectoryComponent)
  },
  { 
    path: 'explore', 
    loadComponent: () => import('./components/explore/explore.component').then(c => c.ExploreComponent)
  },
  { 
    path: 'settings', 
    loadComponent: () => import('./components/settings/settings.component').then(c => c.SettingsComponent), 
    canActivate: [AuthGuard]
  },
  { 
    path: 'admin', 
    loadComponent: () => import('./components/admin-dashboard/admin-dashboard.component').then(c => c.AdminDashboardComponent), 
    canActivate: [AdminGuard]
  },
  { path: '**', component: NotFoundComponent }
];
