// // import { Routes } from '@angular/router';
// // import { LoginComponent } from './components/auth/login/login.component';

// // export const routes: Routes = [
// //     {
// //         path: '/',
// //         component: LoginComponent
// //     }
// // ];


// import { Routes } from '@angular/router';
// import { HomeComponent } from './components/home/home.component';
// // import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
// import { EditorComponent } from './components/editor/editor.component';
// import { LoginComponent } from './components/auth/login/login.component';
// import { RegisterComponent } from './components/auth/register/register.component';
// import { ProfileComponent } from './components/author-directory/profile/profile.component';
// // import { AuthorDirectoryComponent } from './components/author-directory/author-directory.component';
// import { ExploreComponent } from './components/explore/explore.component';
// import { SettingsComponent } from './components/settings/settings.component';
// import { NotFoundComponent } from './components/shared/not-found/not-found.component';
// import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
// // import { AuthGuard } from './guards/auth.guard';
// // import { AdminGuard } from './guards/admin.guard';

// export const routes: Routes = [
//   { path: '', component: HomeComponent, pathMatch: 'full' },
// //   { path: 'article/:id', component: ArticleDetailComponent },
// //   { path: 'editor', component: EditorComponent, canActivate: [AuthGuard] },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
// //   { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
// //   { path: 'profile/:id', component: ProfileComponent },
// //   { path: 'directory', component: AuthorDirectoryComponent },
// //   { path: 'explore', component: ExploreComponent },
// //   { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
// //   { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
//   { path: '**', component: NotFoundComponent }
// ];


/**
 * 
 * import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { EditorComponent } from './components/editor/editor.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';
import { ProfileComponent } from './components/author-directory/profile.component';
import { ExploreComponent } from './components/explore/explore.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/shared/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'editor', component: EditorComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileComponent },
  {
    path: 'directory',
    loadChildren: () => import('./components/author-directory/author-directory.routes').then(m => m.default)
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () => import('./components/admin-dashboard/admin-dashboard.routes').then(m => m.default)
  },
  { path: 'explore', component: ExploreComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];

 */

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { EditorComponent } from './components/editor/editor.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/author-directory/profile/profile.component';
import { AuthorDirectoryComponent } from './components/author-directory/author-directory.component';
import { ExploreComponent } from './components/explore/explore.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
// import { AuthGuard } from './guards/auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'article/:id', component: ArticleDetailComponent },
  { path: 'editor', component: EditorComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'directory', component: AuthorDirectoryComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: '**', component: NotFoundComponent }
];
