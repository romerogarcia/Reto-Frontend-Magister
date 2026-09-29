import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HORARIOS, HORARIO_SLOTS, MODALIDADES } from '../../core/enrollment.data';
import { EnrollmentStore } from '../../core/enrollment.store';
import { Control } from '../../ui/atoms/control/control';
import { ChoiceGroup } from '../../ui/molecules/choice-group/choice-group';
import { Fieldset } from '../../ui/molecules/fieldset/fieldset';
import { FormField } from '../../ui/molecules/form-field/form-field';
import { StepActions } from '../../ui/molecules/step-actions/step-actions';
import { StepLayout } from '../../ui/templates/step-layout/step-layout';

@Component({
  selector: 'app-modality',
  imports: [
    ReactiveFormsModule,
    StepLayout,
    Fieldset,
    FormField,
    ChoiceGroup,
    Control,
    StepActions,
  ],
  templateUrl: './modality.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalityPage {
  private readonly store = inject(EnrollmentStore);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly modalidadOptions = MODALIDADES.map((m) => ({ value: m, label: m }));
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

  protected next(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.store.save('modality', this.form.getRawValue());
    this.router.navigate(['/rates']);
  }
}
