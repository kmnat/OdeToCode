import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { LoginComponent } from './pages/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HeroComponent }, // Default route
  ];