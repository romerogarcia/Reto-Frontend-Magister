import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { EnrollmentStore } from '../../core/enrollment.store';
import { FieldError } from '../../shared/field-error/field-error';
import { StepsSidebar } from '../../shared/steps-sidebar/steps-sidebar';
import {
  dniNieValidator,
  spanishMobileValidator,
} from '../../shared/validators/spanish-validators';

@Component({
  selector: 'app-data',
  imports: [ReactiveFormsModule, RouterLink, StepsSidebar, FieldError],
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

  protected invalid(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && control.touched;
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
