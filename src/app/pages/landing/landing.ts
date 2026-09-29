import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { STEPS } from '../../core/enrollment.data';
import { EnrollmentStore } from '../../core/enrollment.store';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
  private readonly router = inject(Router);
  private readonly store = inject(EnrollmentStore);

  /** Retoma la matrícula en el primer paso pendiente. */
  start(): void {
    const next = STEPS[Math.min(this.store.firstPendingStep(), STEPS.length - 1)];
    this.router.navigate(['/', next.path]);
  }
}
