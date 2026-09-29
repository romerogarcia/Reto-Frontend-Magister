import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { METODOS_PAGO } from '../../core/enrollment.data';
import { PaymentMethod } from '../../core/enrollment.model';
import { EnrollmentStore } from '../../core/enrollment.store';
import { FieldError } from '../../shared/field-error/field-error';
import { StepsSidebar } from '../../shared/steps-sidebar/steps-sidebar';

@Component({
  selector: 'app-payment',
  imports: [ReactiveFormsModule, RouterLink, StepsSidebar, FieldError],
  templateUrl: './payment.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentPage {
  private readonly store = inject(EnrollmentStore);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  protected readonly metodos = METODOS_PAGO;

  protected readonly form = this.fb.group({
    metodo: this.fb.control<PaymentMethod | null>(null, Validators.required),
    recomendado: this.fb.control<boolean | null>(null, Validators.required),
  });

  constructor() {
    const saved = this.store.get('payment');
    if (saved) {
      this.form.setValue(saved);
    }
  }

  protected chooseMetodo(value: PaymentMethod): void {
    this.form.controls.metodo.setValue(value);
    this.form.controls.metodo.markAsTouched();
  }

  protected chooseRecomendado(value: boolean): void {
    this.form.controls.recomendado.setValue(value);
    this.form.controls.recomendado.markAsTouched();
  }

  protected send(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { metodo, recomendado } = this.form.getRawValue();
    this.store.save('payment', { metodo: metodo!, recomendado: recomendado! });
    if (this.store.submit()) {
      this.router.navigate(['/final']);
    }
  }
}
