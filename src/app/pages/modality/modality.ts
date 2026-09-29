import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { HORARIOS, HORARIO_SLOTS, MODALIDADES } from '../../core/enrollment.data';
import { EnrollmentStore } from '../../core/enrollment.store';
import { FieldError } from '../../shared/field-error/field-error';
import { StepsSidebar } from '../../shared/steps-sidebar/steps-sidebar';

@Component({
  selector: 'app-modality',
  imports: [ReactiveFormsModule, RouterLink, StepsSidebar, FieldError],
  templateUrl: './modality.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalityPage {
  private readonly store = inject(EnrollmentStore);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly modalidades = MODALIDADES;
  protected readonly horarios = HORARIOS;

  protected readonly form = this.fb.group({
    modalidad: ['', Validators.required],
    horarios: this.fb.array(
      Array.from({ length: HORARIO_SLOTS }, () =>
        this.fb.control(HORARIOS[0], Validators.required),
      ),
    ),
  });

  constructor() {
    const saved = this.store.get('modality');
    if (saved) {
      this.form.setValue(saved);
    }
  }

  protected chooseModalidad(value: string): void {
    this.form.controls.modalidad.setValue(value);
    this.form.controls.modalidad.markAsTouched();
  }

  protected next(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.save('modality', this.form.getRawValue());
    this.router.navigate(['/rates']);
  }
}
