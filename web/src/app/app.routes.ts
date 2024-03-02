import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login/login.component';
import { HomeComponent } from './features/main/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
