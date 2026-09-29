import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { STEPS } from '../../core/enrollment.data';
import { EnrollmentStore } from '../../core/enrollment.store';
import { StepActions } from '../../ui/molecules/step-actions/step-actions';
import { HeroLayout } from '../../ui/templates/hero-layout/hero-layout';

@Component({
  selector: 'app-landing',
  imports: [HeroLayout, StepActions],
  template: `
    <app-hero-layout>
      <h1 class="t-hero__title">¡Comencemos con tu matrícula!</h1>
      <p class="t-hero__text">
        Para comenzar a especializarte, vamos a realizar unas preguntas para darte el mejor servicio
      </p>
      <app-step-actions label="Comenzar" type="button" (primary)="start()" />
    </app-hero-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
  private readonly router = inject(Router);
  private readonly store = inject(EnrollmentStore);

  /** Retoma la matrícula en el primer paso pendiente. */
  protected start(): void {
    const next = STEPS[Math.min(this.store.firstPendingStep(), STEPS.length - 1)];
    this.router.navigate(['/', next.path]);
  }
}
