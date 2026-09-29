import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Control } from '../../../shared/ui/atoms/control/control';
import { ChoiceGroup } from '../../../shared/ui/molecules/choice-group/choice-group';
import { Fieldset } from '../../../shared/ui/molecules/fieldset/fieldset';
import { FormField } from '../../../shared/ui/molecules/form-field/form-field';
import { EX_ALUMNO_OPTIONS, MATERIAL, PROVINCIAS, RAMAS } from '../../enrollment.data';
import { FormerStudent } from '../../enrollment.model';
import { StepPage } from '../../step-page/step-page';

@Component({
  selector: 'app-specialization-step',
  imports: [ReactiveFormsModule, StepPage, FormField, Fieldset, ChoiceGroup, Control],
  templateUrl: './specialization.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpecializationStep {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly ramas = RAMAS;
  protected readonly provincias = PROVINCIAS;
  protected readonly exAlumnoOptions = EX_ALUMNO_OPTIONS;
  protected readonly materialOptions = [{ value: MATERIAL, label: MATERIAL }];

  protected readonly form = this.fb.group({
    rama: ['', Validators.required],
    provincia: ['', Validators.required],
    exAlumno: this.fb.control<FormerStudent | ''>('', Validators.required),
    material: ['', Validators.required],
  });
}
