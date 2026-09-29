import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EX_ALUMNO_OPTIONS, MATERIAL, PROVINCIAS, RAMAS } from '../../core/enrollment.data';
import { FormerStudent, Specialization } from '../../core/enrollment.model';
import { EnrollmentStore } from '../../core/enrollment.store';
import { FieldError } from '../../shared/field-error/field-error';
import { StepsSidebar } from '../../shared/steps-sidebar/steps-sidebar';

@Component({
  selector: 'app-specialized',
  imports: [ReactiveFormsModule, StepsSidebar, FieldError],
  templateUrl: './specialized.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecializedPage {
  private readonly store = inject(EnrollmentStore);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly ramas = RAMAS;
  protected readonly provincias = PROVINCIAS;
  protected readonly exAlumnoOptions = EX_ALUMNO_OPTIONS;
  protected readonly material = MATERIAL;

  protected readonly form = this.fb.group({
    rama: ['', Validators.required],
    provincia: ['', Validators.required],
    exAlumno: this.fb.control<FormerStudent | ''>('', Validators.required),
    material: ['', Validators.required],
  });

  constructor() {
    const saved = this.store.get('specialization');
    if (saved) {
      this.form.setValue(saved);
    }
  }

  protected choose(control: 'exAlumno' | 'material', value: string): void {
    const ctrl = this.form.controls[control];
    ctrl.setValue(value as never);
    ctrl.markAsTouched();
  }

  protected next(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.save('specialization', this.form.getRawValue() as Specialization);
    this.router.navigate(['/modality']);
  }
}
