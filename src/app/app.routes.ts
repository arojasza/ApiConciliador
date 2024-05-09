import { Routes } from '@angular/router';
import { PageErrorComponent } from './modules/app/page-error/page-error.component';
import { LoginComponent } from './modules/app/login/login.component';

export const routes: Routes = [
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    // {
    //     path: 'login',
    //     component: LoginComponent
    //   }, 
    {
        path: 'page-error',
        component: PageErrorComponent,
        pathMatch: 'full',
    },
    {
        path: 'profile',
        component: PageErrorComponent,
        pathMatch: 'full',
    },
];
