import { Route, Routes } from '@angular/router';

import { STEPS } from './enrollment.data';
import { stepGuard, submittedGuard } from './enrollment.guards';
import { StepKey } from './enrollment.model';

/** Ruta de un paso: la URL, el título y el guard salen de la configuración STEPS. */
function stepRoute(key: StepKey, loadComponent: Route['loadComponent']): Route {
  const step = STEPS.find((s) => s.key === key)!;
  return {
    path: step.path,
    title: `${step.label} · Magister`,
    canActivate: [stepGuard],
    loadComponent,
  };
}

export default [
  stepRoute('specialization', () =>
    import('./steps/specialization/specialization').then((m) => m.SpecializationStep),
  ),
  stepRoute('modality', () => import('./steps/modality/modality').then((m) => m.ModalityStep)),
  stepRoute('rate', () => import('./steps/rate/rate').then((m) => m.RateStep)),
  stepRoute('personalData', () =>
    import('./steps/personal-data/personal-data').then((m) => m.PersonalDataStep),
  ),
  stepRoute('address', () => import('./steps/address/address').then((m) => m.AddressStep)),
  stepRoute('payment', () => import('./steps/payment/payment').then((m) => m.PaymentStep)),
  {
    path: 'final',
    title: '¡Gracias! · Magister',
    canActivate: [submittedGuard],
    loadComponent: () => import('./confirmation/confirmation').then((m) => m.Confirmation),
  },
] satisfies Routes;
