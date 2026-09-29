import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { TARIFAS } from '../../core/enrollment.data';
import { EnrollmentStore } from '../../core/enrollment.store';
import { FieldError } from '../../shared/field-error/field-error';
import { StepsSidebar } from '../../shared/steps-sidebar/steps-sidebar';

@Component({
  selector: 'app-rates',
  imports: [ReactiveFormsModule, RouterLink, StepsSidebar, FieldError],
  templateUrl: './rates.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatesPage {
  private readonly store = inject(EnrollmentStore);
  private readonly router = inject(Router);

  protected readonly tarifas = TARIFAS;
  protected readonly tarifaId = inject(FormBuilder).nonNullable.control(
    this.store.get('rate')?.tarifaId ?? '',
    Validators.required,
  );

  protected choose(id: string): void {
    this.tarifaId.setValue(id);
    this.tarifaId.markAsTouched();
  }

  protected next(): void {
    if (this.tarifaId.invalid) {
      this.tarifaId.markAsTouched();
      return;
    }
    this.store.save('rate', { tarifaId: this.tarifaId.value });
    this.router.navigate(['/data']);
  }
}
