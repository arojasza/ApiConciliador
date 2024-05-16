import { Routes } from '@angular/router';
import { PageErrorComponent } from './modules/app/page-error/page-error.component';
import { LoginComponent } from './modules/app/login/login.component';
import { InicioComponent } from './modules/app/inicio/inicio.component';
import { AreasComponent } from './modules/Maestros/areas/areas.component';
import { MsalGuard } from '@azure/msal-angular';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
      }, 
    {
        path: 'panelusuario',
        component: InicioComponent,
        pathMatch: 'full',
        canActivate: [MsalGuard]
    },
    {
        path: 'profile',
        component: PageErrorComponent,
        pathMatch: 'full',
        canActivate: [MsalGuard]

    },
    {
        path: 'modulos/usuarios',
        component: AreasComponent,
        pathMatch: 'full',
    },
    {
         path: '**',
         component: PageErrorComponent,
         pathMatch: 'full',
   },
];
