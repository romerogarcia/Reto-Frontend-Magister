import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import { EnrollmentStore } from '../../core/enrollment.store';
import { StepActions } from '../../ui/molecules/step-actions/step-actions';
import { HeroLayout } from '../../ui/templates/hero-layout/hero-layout';

@Component({
  selector: 'app-final',
  imports: [HeroLayout, StepActions],
  template: `
    <app-hero-layout>
      <div>
        <h1 class="t-hero__title">¡Gracias{{ firstName() ? ', ' + firstName() : '' }}!</h1>
        <p class="t-hero__title">Tu reserva está en proceso</p>
      </div>
      <p class="t-hero__text t-hero__text--wide">
        La matrícula solo será efectiva una vez se haya recibido el pago por tarjeta o transferencia
      </p>
      <app-step-actions label="Vuelve a Home" type="button" inverse (primary)="goHome()" />
    </app-hero-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalPage {
  private readonly store = inject(EnrollmentStore);
  private readonly router = inject(Router);

  /** Nombre de pila para personalizar el agradecimiento. */
  protected readonly firstName = computed(
    () => this.store.enrollment().personalData?.nombre.trim().split(/\s+/)[0] ?? '',
  );

  protected goHome(): void {
    this.store.reset();
    this.router.navigate(['/']);
  }
}
