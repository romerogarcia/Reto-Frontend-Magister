import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Reto Frontend Magister',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  // Funcionalidad de matrícula (pasos + confirmación), cargada bajo demanda.
  { path: '', loadChildren: () => import('./enrollment/enrollment.routes') },
  {
    path: '**',
    title: 'Página no encontrada · Magister',
    loadComponent: () => import('./not-found/not-found').then((m) => m.NotFound),
  },
];
