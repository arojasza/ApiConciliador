import { Routes } from '@angular/router';
import { PageErrorComponent } from './modules/app/page-error/page-error.component';
import { LoginComponent } from './modules/app/login/login.component';
import { InicioComponent } from './modules/app/inicio/inicio.component';
import { AreasComponent } from './modules/Maestros/areas/areas.component';
import { MsalGuard } from '@azure/msal-angular';
import { ConversionCentrosCostoComponent } from './modules/Maestros/conversionCentrosCosto/conversionCentrosCosto.component';

import { CatalogoGeneralComponent } from './modules/Maestros/catalogoGeneral/catalogoGeneral.component';
import { ResponseMessageViewComponent } from './modules/configuración/response-messages/components/response-message-view/response-message-view.component';
import { EmpresaComponent } from './modules/Maestros/Empresa/empresa.component';
import { ResponseMessageCrudComponent } from './modules/configuración/response-messages/components/response-message-crud/response-message-crud.component';
import { CatalogoNombreEntidades } from './modules/Maestros/catalogoNombre/catalogoNombreEntidades.component'; 
import { CatalogoConversion } from './modules/Maestros/catalogoConversion/catalogoConversion.component';

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
        path: 'modulos/conversioncentroscosto',
        component: ConversionCentrosCostoComponent,
        pathMatch: 'full',
    },
    {
        path: 'modulos/empresa',
        component: EmpresaComponent,
        pathMatch: 'full',
    },
    {
        path: 'modulos/catalogogeneral',
        component: CatalogoGeneralComponent,
        pathMatch: 'full',
    },
    {
      path: 'modulos/catalogonombre',
      component: CatalogoNombreEntidades,
      pathMatch: 'full',
  },
  {
    path: 'modulos/catalogoconversion',
    component: CatalogoConversion,
    pathMatch: 'full',
},
    {
        path: 'configuracion/configuracion-plantilla',
        component: ResponseMessageCrudComponent,
        children: [
            {
              path: 'configuracion/configuracion-plantilla',
              component: ResponseMessageViewComponent
            },
            {
              path: 'crear-o-modificar',
              component: ResponseMessageCrudComponent
            },
            {
              path: '**',
              redirectTo: 'listar',
            },
          ],
    },
    {
         path: '**',
         component: PageErrorComponent,
         pathMatch: 'full',
   },
];
