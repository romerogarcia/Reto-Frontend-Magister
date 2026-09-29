import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Control } from '../../../shared/ui/atoms/control/control';
import { ChoiceGroup } from '../../../shared/ui/molecules/choice-group/choice-group';
import { Fieldset } from '../../../shared/ui/molecules/fieldset/fieldset';
import { FormField } from '../../../shared/ui/molecules/form-field/form-field';
import { HORARIOS, HORARIO_SLOTS, MODALIDADES } from '../../enrollment.data';
import { StepPage } from '../../step-page/step-page';

@Component({
  selector: 'app-modality-step',
  imports: [ReactiveFormsModule, StepPage, Fieldset, FormField, ChoiceGroup, Control],
  templateUrl: './modality.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalityStep {
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
}
