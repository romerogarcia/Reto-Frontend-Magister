import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { EnrollmentStore } from '../../core/enrollment.store';

@Component({
  selector: 'app-final',
  imports: [RouterLink],
  templateUrl: './final.html',
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
