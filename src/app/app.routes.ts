import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      {
        path: 'heroes',
        title: 'Listado de heroes',
        loadComponent: () =>
          import('./dashboard/pages/heroes/heroes.component'),
      },
      {
        path: 'heroe/:id',
        title: 'heroe',
        loadComponent: () => import('./dashboard/pages/heroes/info-heroe/info-heroe.component'),
      },

      {
        path: '',
        redirectTo: 'heroes',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
