import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { STEPS } from './enrollment.data';
import { EnrollmentStore } from './enrollment.store';

/**
 * Impide saltarse pasos: si el usuario entra por URL a un paso cuyos
 * anteriores no están completos, se le redirige al primer paso pendiente.
 */
export const stepGuard: CanActivateFn = (route) => {
  const store = inject(EnrollmentStore);
  const router = inject(Router);
  const stepIndex = STEPS.findIndex((step) => step.path === route.routeConfig?.path);

  if (stepIndex === -1 || store.canAccess(stepIndex)) {
    return true;
  }
  return router.createUrlTree(['/', STEPS[store.firstPendingStep()].path]);
};

/** La página final solo es accesible tras enviar la matrícula. */
export const submittedGuard: CanActivateFn = () => {
  const store = inject(EnrollmentStore);
  return store.submitted() || inject(Router).createUrlTree(['/']);
};
