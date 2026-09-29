import { Routes } from '@angular/router';

import { stepGuard, submittedGuard } from './core/step.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Reto Frontend Magister',
    loadComponent: () => import('./pages/landing/landing').then((m) => m.LandingPage),
  },
  {
    path: 'specialized',
    title: 'Especialización · Magister',
    canActivate: [stepGuard],
    loadComponent: () => import('./pages/specialized/specialized').then((m) => m.SpecializedPage),
  },
  {
    path: 'modality',
    title: 'Horario y modalidad · Magister',
    canActivate: [stepGuard],
    loadComponent: () => import('./pages/modality/modality').then((m) => m.ModalityPage),
  },
  {
    path: 'rates',
    title: 'Tarifa · Magister',
    canActivate: [stepGuard],
    loadComponent: () => import('./pages/rates/rates').then((m) => m.RatesPage),
  },
  {
    path: 'data',
    title: 'Datos personales · Magister',
    canActivate: [stepGuard],
    loadComponent: () => import('./pages/data/data').then((m) => m.DataPage),
  },
  {
    path: 'address',
    title: 'Dirección · Magister',
    canActivate: [stepGuard],
    loadComponent: () => import('./pages/address/address').then((m) => m.AddressPage),
  },
  {
    path: 'payment',
    title: 'Forma de pago · Magister',
    canActivate: [stepGuard],
    loadComponent: () => import('./pages/payment/payment').then((m) => m.PaymentPage),
  },
  {
    path: 'final',
    title: '¡Gracias! · Magister',
    canActivate: [submittedGuard],
    loadComponent: () => import('./pages/final/final').then((m) => m.FinalPage),
  },
  {
    path: '**',
    title: 'Página no encontrada · Magister',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage),
  },
];
