import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { AuthGuard } from './services/atuhentication/auth.guard';
import { TestPageComponent } from './playground/test-page/test-page.component';

export const routes: Routes = [
    {path: 'login',component: LoginComponent},
    {path: 'registro', component: RegistrarComponent},
    {path: '', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'playground/test', component: TestPageComponent},
    { path: '**', redirectTo: '' }
];
