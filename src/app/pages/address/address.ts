import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { COMUNIDADES } from '../../core/enrollment.data';
import { EnrollmentStore } from '../../core/enrollment.store';
import { FieldError } from '../../shared/field-error/field-error';
import { StepsSidebar } from '../../shared/steps-sidebar/steps-sidebar';
import { postalCodeValidator } from '../../shared/validators/spanish-validators';

@Component({
  selector: 'app-address',
  imports: [ReactiveFormsModule, RouterLink, StepsSidebar, FieldError],
  templateUrl: './address.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressPage {
  private readonly store = inject(EnrollmentStore);
  private readonly router = inject(Router);

  protected readonly comunidades = COMUNIDADES;

  protected readonly form = inject(FormBuilder).nonNullable.group({
    comunidad: ['', Validators.required],
    direccion: ['', Validators.required],
    localidad: ['', Validators.required],
    provincia: ['', Validators.required],
    cp: ['', [Validators.required, postalCodeValidator]],
    aceptaLegal: [false, Validators.requiredTrue],
    aceptaPrivacidad: [false, Validators.requiredTrue],
  });

  constructor() {
    const saved = this.store.get('address');
    if (saved) {
      this.form.setValue(saved);
    }
  }

  protected invalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && control.touched;
  }

  protected next(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.save('address', this.form.getRawValue());
    this.router.navigate(['/payment']);
  }
}
