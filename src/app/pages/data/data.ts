import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EnrollmentStore } from '../../core/enrollment.store';
import { dniNieValidator, spanishMobileValidator } from '../../core/validators/spanish-validators';
import { Control } from '../../ui/atoms/control/control';
import { FormField } from '../../ui/molecules/form-field/form-field';
import { StepActions } from '../../ui/molecules/step-actions/step-actions';
import { StepLayout } from '../../ui/templates/step-layout/step-layout';

@Component({
  selector: 'app-data',
  imports: [ReactiveFormsModule, StepLayout, FormField, Control, StepActions],
  templateUrl: './data.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataPage {
  private readonly store = inject(EnrollmentStore);
  private readonly router = inject(Router);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, dniNieValidator]],
    movil: ['', [Validators.required, spanishMobileValidator]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {
    const saved = this.store.get('personalData');
    if (saved) {
      this.form.setValue(saved);
    }
  }

  protected next(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.save('personalData', this.form.getRawValue());
    this.router.navigate(['/address']);
  }
}
