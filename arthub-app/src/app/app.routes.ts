import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { AuthGuard } from './services/atuhentication/auth.guard';

export const routes: Routes = [
    {path: 'login',component: LoginComponent},
    {path: 'registro', component: RegistrarComponent},
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '' }
];
