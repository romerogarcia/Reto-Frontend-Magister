import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { COMUNIDADES } from '../../core/enrollment.data';
import { EnrollmentStore } from '../../core/enrollment.store';
import { postalCodeValidator } from '../../core/validators/spanish-validators';
import { Control } from '../../ui/atoms/control/control';
import { Checkbox } from '../../ui/molecules/checkbox/checkbox';
import { FormField } from '../../ui/molecules/form-field/form-field';
import { StepActions } from '../../ui/molecules/step-actions/step-actions';
import { StepLayout } from '../../ui/templates/step-layout/step-layout';

@Component({
  selector: 'app-address',
  imports: [ReactiveFormsModule, StepLayout, FormField, Control, Checkbox, StepActions],
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

  protected next(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.save('address', this.form.getRawValue());
    this.router.navigate(['/payment']);
  }
}
