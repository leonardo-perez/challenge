import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ServiceComponent } from './pages/service/service.component';
import { MainLayoutComponent } from './components/shared/core/main-layout/main-layout.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';
;

export const routes: Routes = [
 {
        path : 'login',
        canActivate: [LoginGuard],
        component : LoginComponent
    },
    {
        path: '',
        canActivate: [AuthGuard],
        component: MainLayoutComponent,
        children: [
            { path: 'servicios', component: ServiceComponent },
            { path: '', redirectTo: 'servicios', pathMatch: 'full' },
        ]
    },
    { path: '**', redirectTo: '' }
]; 