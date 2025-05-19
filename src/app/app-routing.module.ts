import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { HeroComponent } from './components/hero/hero.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HeroComponent }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 