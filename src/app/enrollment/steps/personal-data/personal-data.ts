import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Control } from '../../../shared/ui/atoms/control/control';
import { FormField } from '../../../shared/ui/molecules/form-field/form-field';
import { StepPage } from '../../step-page/step-page';
import { dniNieValidator, spanishMobileValidator } from '../../validators/spanish-validators';

@Component({
  selector: 'app-personal-data-step',
  imports: [ReactiveFormsModule, StepPage, FormField, Control],
  templateUrl: './personal-data.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalDataStep {
  protected readonly form = inject(FormBuilder).nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    dni: ['', [Validators.required, dniNieValidator]],
    movil: ['', [Validators.required, spanishMobileValidator]],
    email: ['', [Validators.required, Validators.email]],
  });
}
