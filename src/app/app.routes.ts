import { Routes } from '@angular/router';
import { PageErrorComponent } from './shared/components/page-error/page-error.component';

export const routes: Routes = [
    {
        path: '**',
        component: PageErrorComponent,
        pathMatch: 'full',
      },
];
